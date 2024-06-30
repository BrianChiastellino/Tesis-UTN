import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoinGecko } from '../../../../models/coin-gecko/interface/coin-gecko.models';
import { Coin } from '../../../../models/coin-user/interface/coin-user.models';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Currency } from '../../../../models/enum/currency.enum';
import { Wallet } from '../../../../models/wallet/wallet.models';
import { DialogConfirmData, Dialogdata } from '../../../../models/dialog/dialog.interface';
import { Operation } from '../../../../models/enum/dialog.enum';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

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
    amountToSell: ['',[Validators.required, this.fundsValidator(this.data.wallet)]],
    currencyType: [Currency.USD, [Validators.required]],
  })

  constructor(
    private dialogRef: MatDialogRef<DialogSellComponent, Wallet | null>, @Inject(MAT_DIALOG_DATA) public data: Dialogdata,
    private fb: FormBuilder,
    private dialog: MatDialog,

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
    const amountTobuy = this.formSell.controls['amountTobuy'].value;

    const coin = this.createCoin(coinGecko, currency, amountTobuy);

    this.openDialog(amountTobuy,coin)
    .subscribe( data => {
      if( data ) this.updateWallet(coin, wallet);
    })


  }

  //venta
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

  private openDialog ( amountTobuy: number, coin: Coin) : Observable<boolean>  {

    const dialogConfirmData: DialogConfirmData = {
      funds: amountTobuy,
      coin: coin,
      operation: Operation.SELL
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: dialogConfirmData });

    return dialogRef.afterClosed()

  }

  private sendWalletToMarket(wallet: Wallet) : void {
    this.dialogRef.close(wallet);
  }

  //todo: Crear la coin al ser tipo de venta

  private createCoin (coinGecko: CoinGecko, currency: Currency, amountTobuy: number): Coin {

    const coin = new Coin({...coinGecko});
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

  public isValidField(field: string): boolean | null {
    return this.formSell.controls[field].errors && this.formSell.controls[field].touched;
  }

  public messageFieldError (field: string) : string | null {

    if (!this.formSell.controls[field]) return null;

    const errors = this.formSell.controls[field].errors || {};

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
