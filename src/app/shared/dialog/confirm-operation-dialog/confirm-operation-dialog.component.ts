import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-operation-dialog',
  templateUrl: './confirm-operation-dialog.component.html',
  styleUrl: './confirm-operation-dialog.component.css'
})
export class ConfirmOperationDialogComponent {

  constructor(

    private dialogRef: MatDialogRef<ConfirmOperationDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data = null,

  ) { }

  public onCancel () : void {
    this.dialogRef.close(false);
  }

  public onConfirm () : void {
    this.dialogRef.close(true);
  }




}
