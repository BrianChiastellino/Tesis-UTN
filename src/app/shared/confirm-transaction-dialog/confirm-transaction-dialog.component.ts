import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmData } from '../../models/dialog/dialog.interface';
import { Currency } from '../../models/enum/currency.enum';
import { Operation } from '../../models/enum/dialog.enum';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-transaction-dialog.component.html',
  styleUrl: './confirm-transaction-dialog.component.css'
})

export class ConfirmTransactionDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmTransactionDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirmData,

  ) { }

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public onConfirm(): void {
    this.dialogRef.close(true);
  }

}
