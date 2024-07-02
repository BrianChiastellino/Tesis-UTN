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
    amountToSell: ['', [Validators.required, this.fundsValidator(this.data.wallet)]],
    currencyType: [Currency.USD, [Validators.required]],
  })

  constructor(
    private dialogRef: MatDialogRef<DialogSellComponent, Wallet | null>, @Inject(MAT_DIALOG_DATA) public data: Dialogdata,
    private fb: FormBuilder,
    private dialog: MatDialog,

  ) { }

  public setCurrency(currency: string): void {
    currency == 'usd' ? this.formSell.controls['currencyType'].setValue(Currency.USD) : this.formSell.controls['currencyType'].setValue(Currency.CRYPTO);
    this.currencyTypeButton = currency;
    this.formSell.get('amountToSell')?.reset();
  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }

  public onConfirm(): void {

    if (!this.formSell.valid) return;


    const wallet: Wallet = { ...this.data.wallet };
    const coinGecko: CoinGecko = { ...this.data.coinGecko };
    const currency: Currency = this.formSell.controls['currencyType'].value;
    const amountToSell: number = Number.parseFloat(this.formSell.controls['amountToSell'].value)
    const index = this.getIndexCoinInWallet(coinGecko, wallet);


    const coin = this.createCoin(coinGecko, currency, amountToSell);

    this.openDialog(amountToSell, coin)
      .subscribe(data => {
        if (data) this.updateWallet(coin, wallet, currency, amountToSell, index);
      })


  }

  private createCoin(coinGecko: CoinGecko, currency: Currency, amountToSell: number): Coin {

    const coin = new Coin({ ...coinGecko });
    coin.date = new Date().toLocaleString();

    if (currency == Currency.USD) {
      coin.coinAmount = amountToSell / coinGecko.current_price;
    } else if (currency == Currency.CRYPTO) {
      coin.coinAmount = amountToSell;
    }




    return coin;

  }

  private openDialog(amountToSell: number, coin: Coin): Observable<boolean> {

    const dialogConfirmData: DialogConfirmData = {
      funds: amountToSell,
      coin: coin,
      operation: Operation.SELL
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: dialogConfirmData });

    return dialogRef.afterClosed()

  }

  //venta
  private updateWallet(coin: Coin, wallet: Wallet, currency: Currency, amountToSell: number, index: number): void {


    if (currency == Currency.USD) { wallet.funds += amountToSell; }
    else if (currency == Currency.CRYPTO) { wallet.funds += (amountToSell * this.data.coinGecko.current_price); }


    wallet.coins![index].coinAmount -= coin.coinAmount;

    if (wallet.coins![index].coinAmount <= 0) { wallet.coins?.splice(index, 1) }

    this.sendWalletToMarket(wallet);

  }

  private getIndexCoinInWallet(coin: CoinGecko, wallet: Wallet): number {

    if (!wallet.coins) return -1;

    return wallet.coins.findIndex(c => c.id == coin.id);
  }

  private sendWalletToMarket(wallet: Wallet): void {
    this.dialogRef.close(wallet);
  }

  public removeLetters(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/[^\d,.]/g, '');
    value = value.replace(',', '.');

    input.value = value;
  }

  private fundsValidator(wallet: Wallet): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const amountToSell: number = control.value;
      const currency: Currency | undefined = control.parent?.get('currencyType')?.value;
      const coin: CoinGecko = this.data.coinGecko;
      const index = this.getIndexCoinInWallet(coin, wallet);

      if (currency === Currency.USD) {
        const requiredAmount = amountToSell / coin.current_price;
        if (wallet.coins && index >= 0 && wallet.coins[index].coinAmount < requiredAmount) {
          return { funds: true };
        }
      } else if (currency === Currency.CRYPTO) {
        if (wallet.coins && index >= 0 && wallet.coins[index].coinAmount < amountToSell) {
          return { funds: true };
        }
      }

      return null;
    };
  }

  public isValidField(field: string): boolean {
    const control = this.formSell.controls[field];
    return control.errors !== null;
  }

  public messageFieldError(field: string): string | null {
    const control = this.formSell.controls[field];
    if (!control) return null;

    const errors = control.errors || {};

    if (errors['funds']) {
      return 'Fondos insuficientes';
    }

    return null;
  }



}
