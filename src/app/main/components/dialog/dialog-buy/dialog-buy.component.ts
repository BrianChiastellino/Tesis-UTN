import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoinGecko } from '../../../../models/coin-gecko/interface/coin-gecko.models';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Currency } from '../../../../models/enum/currency.enum';
import { Coin } from '../../../../models/coin-user/interface/coin-user.models';

@Component({
  selector: 'app-dialog-buy',
  templateUrl: './dialog-buy.component.html',
  styleUrl: './dialog-buy.component.css'
})
export class DialogBuyComponent {

    /** //todo:
   * Terminar
   * Validaciones
   * Testing
   */

  public currencyTypeButton: string = 'usd';
  public coin: Coin | null = null;

  public formBuy: FormGroup = this.fb.group({
    amountTobuy: ['', [Validators.required, Validators.min(-0)]],
    currencyType: [Currency.USD, [Validators.required]],
  })

  constructor(
    private dialogRef: MatDialogRef<DialogBuyComponent>, @Inject(MAT_DIALOG_DATA) public coinGecko: CoinGecko,
    private fb: FormBuilder,
  ) {}

  public setCurrency( currency: string ): void{

    currency == 'usd' ? this.formBuy.controls['currencyType'].setValue(Currency.USD) : this.formBuy.controls['currencyType'].setValue(Currency.CRYPTO);
    this.currencyTypeButton = currency;

  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }

  public onConfirm(): void {

    if( !this.formBuy.valid) return;

    const currency = this.formBuy.controls['currencyType'].value;

    currency == Currency.USD ? this.buyCoinGeckoCurrencyUsd() : this.buyCoinGeckoCurrencyCrypto();

    this.dialogRef.close([this.coin, this.formBuy.controls['amountTobuy'].value ]);
  }

  private buyCoinGeckoCurrencyUsd (): void {

    const coin = this.createCoinCurrencyUsd();

    console.log({coin});


  }

  private createCoinCurrencyUsd (): void {

    this.coin = new Coin ( { ...this.coinGecko } );
    const amountTobuy = this.formBuy.controls['amountTobuy'].value;

    this.coin.coinAmount = this.coinGecko.current_price * amountTobuy;
    this.coin.date = new Date().toLocaleString();

  }

  private buyCoinGeckoCurrencyCrypto (): void {

  }

  private createCoinCurrencyCrypto (): void {

  }

}
