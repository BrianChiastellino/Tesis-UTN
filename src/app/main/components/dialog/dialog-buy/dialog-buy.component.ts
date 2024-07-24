import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoinGecko } from '../../../../models/coin-gecko/interface/coin-gecko.models';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Currency } from '../../../../models/enum/currency.enum';
import { Coin } from '../../../../models/coin-user/interface/coin-user.models';
import { DialogConfirmData, Dialogdata } from '../../../../models/dialog/dialog.interface';
import { Wallet } from '../../../../models/wallet/wallet.models';

import { Observable, tap } from 'rxjs';
import { Operation } from '../../../../models/enum/dialog.enum';
import { Transaction } from '../../../../admin/models/transaction.models';
import { TransactionType } from '../../../../admin/models/enum/transaction.enum';
import { TransactionsService } from '../../../../admin/services/transactions.service';
import { environment } from '../../../../../environments/environment';
import { ConfirmTransactionDialogComponent } from '../../../../shared/confirm-transaction-dialog/confirm-transaction-dialog.component';

@Component({
  selector: 'app-dialog-buy',
  templateUrl: './dialog-buy.component.html',
  styleUrl: './dialog-buy.component.css'
})

export class DialogBuyComponent {


  public currencyTypeButton: string = 'usd';
  public coin: Coin | null = null;

  public formBuy: FormGroup = this.fb.group({
    amountTobuy: ['', [Validators.required, Validators.max(10000), this.conditionalMinValidator(50), this.fundsValidator(this.data.wallet)]],
    currencyType: [Currency.USD, [Validators.required]],
  })

  constructor(
    private dialogRef: MatDialogRef<DialogBuyComponent, Wallet | null>, @Inject(MAT_DIALOG_DATA) public data: Dialogdata,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private transactionService: TransactionsService,
  ) { }


  public setCurrency(currency: string): void {

    currency == 'usd' ?
      this.formBuy.controls['currencyType'].setValue(Currency.USD) : this.formBuy.controls['currencyType'].setValue(Currency.CRYPTO);
    this.currencyTypeButton = currency;
    this.formBuy.get('amountTobuy')?.setValue('');

  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }

  public onConfirm(): void {

    if (!this.formBuy.valid) return


    const wallet: Wallet = { ...this.data.wallet };
    const coinGecko: CoinGecko = { ...this.data.coinGecko };
    const currency: Currency = this.formBuy.controls['currencyType'].value;
    const amountTobuy: number = Number.parseFloat(this.formBuy.controls['amountTobuy'].value);

    const coin = this.createCoin(coinGecko, currency, amountTobuy);

    this.openDialog(amountTobuy, coin, currency)
      .subscribe(data => {
        if (data) this.updateWallet(coin, wallet, currency);
      })


  }

  private createCoin(coinGecko: CoinGecko, currency: Currency, amountTobuy: number): Coin {

    const coin = new Coin({ ...coinGecko });
    coin.date = new Date().toLocaleString();


    if (currency == Currency.USD) {
      coin.coinAmount = amountTobuy / this.data.coinGecko.current_price;
    } else if (currency == Currency.CRYPTO) {
      coin.coinAmount = amountTobuy;
    }

    return coin;

  }

  private openDialog(amountTobuy: number, coin: Coin, currency: Currency): Observable<boolean> {

    const dialogConfirmData: DialogConfirmData = {
      funds: amountTobuy,
      coin: coin,
      operation: Operation.BUY,
      currency: currency,
      coinCurrentPrice: this.data.coinGecko.current_price,
    }

    const dialogRef = this.dialog.open(ConfirmTransactionDialogComponent, { data: dialogConfirmData });

    return dialogRef.afterClosed()

  }

  private updateWallet(coin: Coin, wallet: Wallet, currency: Currency): void {

    const index = this.getIndexCoinInWallet(coin, wallet);
    const amountTobuy = Number.parseFloat(this.formBuy.controls['amountTobuy'].value);


    if (index != -1) {

      wallet.coins![index].coinAmount += coin.coinAmount
      wallet.coins![index].date = new Date().toLocaleString();

    } else { wallet.coins!.unshift(coin) };

    if (currency == Currency.USD) { wallet.funds -= amountTobuy; }
    else { wallet.funds -= (amountTobuy * this.data.coinGecko.current_price); }


    this.createTransaction(coin, wallet);
    this.sendWalletToMarket(wallet);

  }

  private getIndexCoinInWallet(coin: Coin, wallet: Wallet): number {

    if (!wallet.coins) return -1;

    return wallet.coins.findIndex(c => c.id === coin.id);
  }


  private sendWalletToMarket(wallet: Wallet): void {
    this.dialogRef.close(wallet);
  }

  private createTransaction (coin: Coin, wallet: Wallet ) : void {

    const transaction = new Transaction({
      coinAmount: coin.coinAmount,
      date: new Date().toLocaleString(),
      coinId: coin.id,
      userId: wallet.idUser,
      type: TransactionType.BUY,
    });

    this.transactionService.addTransaction(transaction).subscribe();

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
      const amountTobuy: number = Number.parseFloat(control.value);
      const currency: Currency | undefined = control.parent?.get('currencyType')?.value;
      const coin: CoinGecko = this.data.coinGecko;

      if (currency === Currency.USD) {
        if (wallet.funds < amountTobuy) {
          return { funds: true };
        }
      } else if (currency === Currency.CRYPTO) {
        if (amountTobuy !== 0 && wallet.funds < (amountTobuy * coin.current_price)) {
          return { funds: true };
        }
      }

      return null;
    };
  }

  private conditionalMinValidator(minValue: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const currency: Currency | undefined = control.parent?.get('currencyType')?.value;
      if (currency !== Currency.CRYPTO && control.value < minValue) {
        return { min: { requiredMin: minValue, actualValue: control.value } };
      }
      return null;
    };
  }


  isValidField( field: string ): boolean | null {
    return this.formBuy.controls[field].errors
      && this.formBuy.controls[field].touched;
  }

  public messageFieldError(field: string): string | null {
    const errors = this.formBuy.controls[field].errors || {};
    if (!errors) return null;

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio';
        case 'funds':
          return 'Fondos insuficientes';
        case 'min':
          return `Mínimo de compra ${errors['min'].requiredMin } USD`;
        case 'max':
          return `Maximo de compra 10,000 USD`;
      }
    }

    return null;
  }


}
