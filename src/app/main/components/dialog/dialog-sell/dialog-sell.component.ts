import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoinGecko } from '../../../../models/coin-gecko/interface/coin-gecko.models';

@Component({
  selector: 'app-dialog-sell',
  templateUrl: './dialog-sell.component.html',
  styleUrl: './dialog-sell.component.css'
})
export class DialogSellComponent {

  constructor( public dialogRef: MatDialogRef<DialogSellComponent>, @Inject(MAT_DIALOG_DATA) public data: CoinGecko ) {}

  public onCancel(): void {
    this.dialogRef.close(null);
  }

  public onConfirm(): void {
    this.dialogRef.close(this.data);
  }


}
