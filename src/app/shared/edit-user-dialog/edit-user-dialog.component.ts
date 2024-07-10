import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../auth/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.css'
})
export class EditUserDialogComponent implements OnInit {

  public hidePassword: boolean = true;

  public editForm: FormGroup = this.fb.group({

    id: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    document: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    admin: [],

  })


  constructor (
    private dialogRef: MatDialogRef<EditUserDialogComponent, boolean>,
    @Inject (MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getUserById( this.data.id )
    .subscribe( user => this.editForm.reset(user));
  }

  public onCancel () : void {
    this.dialogRef.close(false);
  }

  public onConfirm() : void {

    if (!this.editForm.valid) return;

    const user: User = new User ({ ...this.editForm.value });

    this.authService.updateUser(user)
    .subscribe( data => this.dialogRef.close(!!data));
  }

  public showPassword () : void {
    this.hidePassword = !this.hidePassword;
  }

  public isValidfield ( field: string ) : boolean | null {
    return this.editForm.controls[field].errors
    && this.editForm.controls[field].touched;
  }

  public getFieldError ( field: string ) : string | null {

    if ( !this.editForm.controls[field] ) return null;

    const errors = this.editForm.controls[field].errors || {};

    for ( const key of Object.keys(errors) ) {

      switch (key) {

        case 'required':
          return 'Este campo es requerido';


      }

    }

    return null;

  }



}
