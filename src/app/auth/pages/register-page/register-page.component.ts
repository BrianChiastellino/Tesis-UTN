import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { filter, pipe, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ToastService } from '../../../shared/services/toast.service';
import { CustomValidators } from '../../../shared/validators/custom-validators';
import { CustomHelpers } from '../../../shared/helpers/custom-helpers';

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'

})
export class RegisterPageComponent  {

  public hidePassword: boolean  = true;

  public registerForm: FormGroup = this.fb.group({

    name: ['', [Validators.required, CustomValidators.noNumbers(), CustomValidators.noSymbols()]],
    email: ['', [Validators.required, Validators.pattern( CustomValidators.emailPattern)]],
    document: ['', [Validators.required, CustomValidators.onlyNumbers(), CustomValidators.noSymbols(), Validators.minLength(7), Validators.maxLength(10)]],
    username: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.pattern(CustomValidators.passwordPattern), Validators.minLength(7)]],
    admin: [false],

  })

  constructor (
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
  ) {}


  public onSubmit() {

    debugger;

    this.registerForm.markAllAsTouched();

    if( !this.registerForm.valid ) return;

    this.createUser();

  }

  private createUser(): void{

    const user = new User({ ...this.registerForm.value as User })

    this.authService.registerUser(user)
    .pipe(
     tap( user => console.log({user})),
    )
    .subscribe( user => {

      if( !user ) {
        this.registerForm.reset();
        return this.toastService.showError('Error', 'Registro invalido. Intente nuevamente');
      }

      this.router.navigateByUrl('auth/login')
      this.toastService.showSuccess('Éxtio!', 'Te has registrado extiosamente');

    });

  }

  public showPassword () : void {
    this.hidePassword = !this.hidePassword;
  }

  public isValidfield( field: string ): boolean | null {
    return CustomHelpers.isValidField( field, this.registerForm );
  }

  public messageField(field: string): string | null {
    return CustomHelpers.messageFieldFormEditOrRegister( field, this.registerForm );

  }




}


