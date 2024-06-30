import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoinGecko } from '../../../../models/coin-gecko/interface/coin-gecko.models';
import { Coin } from '../../../../models/coin-user/interface/coin-user.models';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Currency } from '../../../../models/enum/currency.enum';
import { Wallet } from '../../../../models/wallet/wallet.models';
import { Dialogdata } from '../../../../models/dialog/dialog.interface';

@Component({
  selector: 'app-dialog-sell',
  templateUrl: './dialog-sell.component.html',
  styleUrl: './dialog-sell.component.css'
})
export class DialogSellComponent {

  /** //todo:
   * Terminar
   * Validaciones
   * Testing
   */



  public currencyTypeButton: string = 'usd';
  public coin: Coin | null = null;

  public formSell: FormGroup = this.fb.group({
    amountToSell: ['',[Validators.required]],
    currencyType: [Currency.USD, [Validators.required]],
  })

  constructor(
    private dialogRef: MatDialogRef<DialogSellComponent, Wallet | null>, @Inject(MAT_DIALOG_DATA) public data: Dialogdata,
    private fb: FormBuilder,
  ) {}

  public setCurrency( currency: string ): void {
    currency == 'usd' ? this.formSell.controls['currencyType'].setValue(Currency.USD) :  this.formSell.controls['currencyType'].setValue(Currency.CRYPTO);
    this.currencyTypeButton = currency;
  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }

  public onConfirm(): void {

    if( !this.formSell.valid) return;

    const wallet: Wallet = { ...this.data.wallet };
    const coinGecko: CoinGecko ={ ...this.data.coinGecko };
    const currency = this.formSell.controls['currencyType'].value;

    const coin = this.createCoin(coinGecko, currency);

    this.updateWallet(coin, wallet);

    this.dialogRef.close(null);

  }

  private updateWallet ( coin: Coin, wallet: Wallet ): void {

    const index = this.getIndexCoinInWallet(coin, wallet);
    const amountTobuy = this.formSell.controls['amountTobuy'].value;

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

  private sendWalletToMarket(wallet: Wallet) : void {
    this.dialogRef.close(wallet);
  }

  //todo: Crear la coin al ser tipo de venta

  private createCoin (coinGecko: CoinGecko, currency: Currency): Coin {

    const coin = new Coin({...coinGecko});
    const amountTobuy = this.formSell.controls['amountTobuy'].value;
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

  //todo: validar la coin a vender

  private fundsValidator(wallet: Wallet): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const amountTobuy = control.value;
      if ( amountTobuy < wallet.funds ) {
        return { funds: true };
      }
      return null;
    };
  }


}
