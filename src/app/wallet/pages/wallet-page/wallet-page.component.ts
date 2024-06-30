import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { User } from '../../../auth/models/user.model';
import { environment } from '../../../../environments/environment';
import { Wallet } from '../../../models/wallet/wallet.models';
import { BehaviorSubject, filter, pipe, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrl: './wallet-page.component.css'
})
export class WalletPageComponent implements OnInit {

  public typeToast$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private token: string = environment.userToken;
  public wallet: Wallet | null = null;
  private user: User | null = null;


  public formFunds: FormGroup = new FormGroup({
    funds: new FormControl('', [Validators.required, Validators.min(100), Validators.max(100000)])
  });

  constructor(
    private walletService: WalletService,
  ) { }

  ngOnInit(): void {

    this.getUserFromLocalStorage();
    this.getWallet();

  }

  private getUserFromLocalStorage(): void {
    this.user = new User(JSON.parse(localStorage.getItem(this.token)!));
  }

  private getWallet(): void {

    this.walletService.getWalletByIdUser(this.user!.id)
      .pipe(
        tap(wallet => console.log({ wallet })),
      )
      .subscribe(wallet => {

        if (wallet?.length == 0) {
          this.createWallet();
          return;
        }

        this.wallet = wallet![0];

      });

  }

  public removeLetters(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
  }

  public depositFunds(): void {

    if (this.formFunds.invalid || !this.wallet) return;

    const funds: number = Number.parseFloat(this.formFunds.controls['funds'].value);

    this.wallet.funds += funds;

    this.updateWallet();

  }

  public withdrawFunds(): void {

    if (this.formFunds.invalid || !this.wallet) return;

    const funds: number = Number.parseFloat(this.formFunds.controls['funds'].value);

    if (this.wallet.funds < funds) return this.typeToast$.next('funds-negative');

    this.wallet.funds -= funds;

    this.updateWallet();

  }

  public isValidField(field: string): boolean | null {
    return this.formFunds.controls[field].errors && this.formFunds.controls[field].touched;
  }

  public messageFieldError (field: string) : string | null {

    if (!this.formFunds.controls[field]) return null;


    const errors = this.formFunds.controls[field].errors || {};
    console.log(errors)

    for( const key of Object.keys(errors)){

      switch ( key ) {

        case 'min':
          return `Monto minimo ${errors['min'].min}`;

        case 'max':
          return `Monto maximo ${errors['max'].max}`

      }


    }

    return null;

  }

  private createWallet(): void {

    const wallet = new Wallet({
      funds: 0,
      idUser: this.user!.id,
    });

    this.walletService.addWallet(wallet)
      .pipe(
        tap(wallet => this.wallet = wallet),
      )
      .subscribe();

  }

  private updateWallet(): void {

    if (!this.wallet) return;

    this.walletService.updateWallet(this.wallet)
      .pipe(
        tap(wallet => this.wallet = wallet),
        tap( () => this.typeToast$.next('funds-success')),
      )
      .subscribe();

  }

}
