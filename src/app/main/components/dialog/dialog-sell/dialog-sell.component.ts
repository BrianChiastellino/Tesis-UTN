import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoinGecko } from '../../../../models/coin-gecko/interface/coin-gecko.models';
import { Coin } from '../../../../models/coin-user/interface/coin-user.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Currency } from '../../../../models/enum/currency.enum';

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
    private dialogRef: MatDialogRef<DialogSellComponent>, @Inject(MAT_DIALOG_DATA) public coinGecko: CoinGecko,
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

    const currency = this.formSell.controls['currencyType'].value;

    currency == Currency.USD ? this.sellCoinCurrencyUsd() : this.sellCoinCurrencyCrypto();

    this.dialogRef.close(null);

  }

  private sellCoinCurrencyUsd (): void {

  }

  private sellCoinCurrencyCrypto (): void {

  }


}
