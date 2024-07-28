import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { filter, pipe, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ToastService } from '../../../shared/services/toast.service';
import { CustomValidators } from '../../../shared/validators/custom-validators';

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'

})
export class RegisterPageComponent  {

  public hidePassword: boolean  = true;

  public registerForm: FormGroup = this.fb.group({

    name: ['', [Validators.required, CustomValidators.noNumbers()]],
    email: ['', [Validators.required, Validators.pattern( CustomValidators.emailPattern)]],
    document: ['', [Validators.required, CustomValidators.onlyNumbers()]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    admin: [false],

  })

  constructor (
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
  ) {}


  public onSubmit() {

    this.registerForm.markAllAsTouched();

    if( !this.registerForm.valid ) return;

    this.createUser();

  }

  private createUser(): void{

    const user = new User({ ...this.registerForm.value as User })

    this.authService.registerUser(user)
    .pipe(
      filter( register => !!register),
    )
    .subscribe( user => {

      if( !user ) return;

      this.router.navigateByUrl('auth/login')
      this.toastService.showSuccess('Éxtio!', 'Te has registrado extiosamente');

    });

  }

  public showPassword () : void {
    this.hidePassword = !this.hidePassword;
  }

  public isValidfield( field: string ): boolean | null {

    return this.registerForm.get(field)!.invalid && this.registerForm.get(field)!.touched;

  }



}


