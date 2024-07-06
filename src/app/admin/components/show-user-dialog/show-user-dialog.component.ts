import { Component, Inject } from '@angular/core';
import { User } from '../../../auth/models/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-user-dialog',
  templateUrl: './show-user-dialog.component.html',
  styleUrl: './show-user-dialog.component.css'
})
export class ShowUserDialogComponent {

  hidePassword: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<ShowUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: User,
  ) {
    console.log(this.data)
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }



}
