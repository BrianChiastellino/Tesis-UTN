import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoinGecko } from '../../../../models/coin-gecko/interface/coin-gecko.models';
import {  AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Currency } from '../../../../models/enum/currency.enum';
import { Coin } from '../../../../models/coin-user/interface/coin-user.models';
import { DialogConfirmData, Dialogdata } from '../../../../models/dialog/dialog.interface';
import { Wallet } from '../../../../models/wallet/wallet.models';

import { Observable, tap } from 'rxjs';
import { Operation } from '../../../../models/enum/dialog.enum';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dialog-buy',
  templateUrl: './dialog-buy.component.html',
  styleUrl: './dialog-buy.component.css'
})
export class DialogBuyComponent {


  public currencyTypeButton: string = 'usd';
  public coin: Coin | null = null;

  public formBuy: FormGroup = this.fb.group({
    amountTobuy: ['', [Validators.required, Validators.min(-0), this.fundsValidator(this.data.wallet)]],
    currencyType: [Currency.USD, [Validators.required]],
  })

  constructor(
    private dialogRef: MatDialogRef<DialogBuyComponent, Wallet | null>, @Inject(MAT_DIALOG_DATA) public data: Dialogdata,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {}


  public setCurrency( currency: string ): void{

    currency == 'usd' ?
     this.formBuy.controls['currencyType'].setValue(Currency.USD) : this.formBuy.controls['currencyType'].setValue(Currency.CRYPTO);

    this.currencyTypeButton = currency;

  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }

  public onConfirm(): void {

    if( !this.formBuy.valid ) return

    const wallet: Wallet =  { ...this.data.wallet };
    const coinGecko: CoinGecko = { ...this.data.coinGecko };
    const currency: Currency = this.formBuy.controls['currencyType'].value;
    const amountTobuy = this.formBuy.controls['amountTobuy'].value;

    const coin = this.createCoin(coinGecko, currency, amountTobuy);

    this.openDialog(amountTobuy,coin)
      .subscribe(data => {
        if (data) this.updateWallet(coin, wallet);
      })


  }

  private updateWallet ( coin: Coin, wallet: Wallet ): void {

    const index = this.getIndexCoinInWallet(coin, wallet);
    const amountTobuy = this.formBuy.controls['amountTobuy'].value;

    if ( index != -1 ) {
      wallet.coins![index].coinAmount += coin.coinAmount
      wallet.coins![index].date = new Date().toLocaleString();
    } else {
      wallet.coins!.push(coin);
    }

    wallet.funds -= amountTobuy;

    console.log({index});
    console.log({wallet});

    this.sendWalletToMarket(wallet);


  }

  private openDialog ( amountTobuy: number, coin: Coin) : Observable<boolean>  {

    let confirm: boolean = false;

    const dialogConfirmData: DialogConfirmData = {
      funds: amountTobuy,
      coin: coin,
      operation: Operation.BUY
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: dialogConfirmData });

    return dialogRef.afterClosed()

  }

  private sendWalletToMarket(wallet: Wallet) : void {
    this.dialogRef.close(wallet);
  }

  private createCoin (coinGecko: CoinGecko, currency: Currency, amountTobuy: number): Coin {

    const coin = new Coin({...coinGecko});
    coin.date = new Date().toLocaleString();


    if( currency == Currency.USD) {
      coin.coinAmount = amountTobuy / this.data.coinGecko.current_price;
     } else if( currency == Currency.CRYPTO) {
      coin.coinAmount = amountTobuy * this.data.coinGecko.current_price;
     }

    return coin;

  }



  public removeLetters(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/[^\d,.]/g, '');
    value = value.replace(',', '.');

    input.value = value;
  }

  private getIndexCoinInWallet (coin: Coin, wallet: Wallet) : number {

    if(!wallet.coins) return -1;

    return wallet.coins.findIndex(c => c.id == coin.id);
  }


  private fundsValidator(wallet: Wallet): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const amountTobuy = control.value;
      if ( amountTobuy > wallet.funds ) {
        return { funds: true };
      }
      return null
    };
  }

  public isValidField(field: string): boolean | null {
    return this.formBuy.controls[field].errors && this.formBuy.controls[field].touched;
  }

  public messageFieldError (field: string) : string | null {

    if (!this.formBuy.controls[field]) return null;

    const errors = this.formBuy.controls[field].errors || {};

    for( const key of Object.keys(errors)){

      switch ( key ) {

        case 'required':
          return 'Este campo es requerido';

        case 'funds':
          return 'Fondos insuficientes';
      }

    }

    return null;

  }

}
