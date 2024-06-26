import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { User } from '../../../auth/models/user.model';
import { environment } from '../../../../environments/environment';
import { Wallet } from '../../../models/wallet/wallet.models';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrl: './wallet-page.component.css'
})
export class WalletPageComponent implements OnInit {

  private token: string = environment.userToken;
  private wallet: Wallet | null = null;
  private user: User | null = null;


  constructor(
    private walletService: WalletService,
  ) {}

  ngOnInit(): void {
    this.getUserFromLocalStorage();
    this.getWallet();

  }

  private getUserFromLocalStorage (): void{
    this.user = new User(JSON.parse(localStorage.getItem(this.token)!));
  }

  private getWallet () : void {
    this.walletService.getWalletByIdUser( this.user!.id )
    .pipe(
      tap( wallet => console.log( {wallet} )),
    )
    .subscribe( wallet => {

      if( !wallet![0] ) {
        this.createWallet();
        return;
      }

      this.wallet = wallet![0];

    });
  }

  private createWallet (): void {

    if( this.wallet ) return;

    this.wallet = new Wallet({
      funds: 0,
      idUser: this.user!.id,
    })

    this.walletService.addWallet( this.wallet ).subscribe();

  }

  private updateWallet (): void{

  }

}
