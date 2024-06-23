import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoinGecko } from '../../../../coin-gecko/interface/coin-gecko.models';

@Component({
  selector: 'app-dialog-buy',
  templateUrl: './dialog-buy.component.html',
  styleUrl: './dialog-buy.component.css'
})
export class DialogBuyComponent {

  constructor( public dialogRef: MatDialogRef<DialogBuyComponent>, @Inject(MAT_DIALOG_DATA) public data: CoinGecko ) {}

  public onCancel(): void {
    this.dialogRef.close(null);
  }

  public onConfirm(): void {
    this.dialogRef.close(this.data);
  }

}
