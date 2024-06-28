import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoinGecko } from '../../../../models/coin-gecko/interface/coin-gecko.models';
import {  AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Currency } from '../../../../models/enum/currency.enum';
import { Coin } from '../../../../models/coin-user/interface/coin-user.models';
import { Dialogdata } from '../../../../models/coin-gecko/dialog/dialog.interface';
import { Wallet } from '../../../../models/wallet/wallet.models';

@Component({
  selector: 'app-dialog-buy',
  templateUrl: './dialog-buy.component.html',
  styleUrl: './dialog-buy.component.css'
})
export class DialogBuyComponent {

    /** //todo:
   * Ahora tengo la wallet y tengo la coin
   * Hago todas las validaciones en el dialog, si hay exito mando la wallet para que en market llamar al update
   * Si algo paso mal uso rxjs y mando null,
   *
   */

  public currencyTypeButton: string = 'usd';
  public coin: Coin | null = null;

  public formBuy: FormGroup = this.fb.group({
    amountTobuy: ['', [Validators.required, Validators.min(-0), this.fundsValidator(this.data.wallet)]],
    currencyType: [Currency.USD, [Validators.required]],
  })

  constructor(
    private dialogRef: MatDialogRef<DialogBuyComponent, Wallet | null>, @Inject(MAT_DIALOG_DATA) public data: Dialogdata,
    private fb: FormBuilder,
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

    const coin = this.createCoin(coinGecko, currency);

    this.updatWallet(coin, wallet);

  }

  private updatWallet ( coin: Coin, wallet: Wallet ): void {

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


    // Si sale todo bien, envio la wallet para el update, si sale algo mal y no pasa las validaciones envio null
  }

  private sendWalletToMarket(wallet: Wallet) : void {
    this.dialogRef.close(wallet);
  }

  private createCoin (coinGecko: CoinGecko, currency: Currency): Coin {

    const coin = new Coin({...coinGecko});
    const amountTobuy = this.formBuy.controls['amountTobuy'].value;
    coin.date = new Date().toLocaleString();


    if( currency == Currency.USD) {
      coin.coinAmount = this.data.coinGecko.current_price * amountTobuy;
     }

    return coin;

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
      return null;
    };
  }

}
