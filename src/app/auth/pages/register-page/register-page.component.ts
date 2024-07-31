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
    document: ['', [Validators.required, CustomValidators.onlyNumbers(), CustomValidators.noSymbols()]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern(CustomValidators.passwordPattern), Validators.min(8)]],
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
    const errors: ValidationErrors | null = CustomHelpers.getFieldErrors(field, this.registerForm);

    if (!errors) return null;

    const errorMessages: { [key: string]: { [key: string]: string } } = {
      name: {
        required: 'Ingrese un nombre válido',
        hasSymbols: 'Ingrese un nombre válido',
        hasNumbers: 'Ingrese un nombre válido',
      },
      email: {
        required: 'Ingrese un email válido',
        pattern: 'El email no tiene un formato válido'
      },
      document: {
        required: 'Ingrese un documento válido',
        hasSymbols: 'Ingrese un documento válido',
        hasLetters: 'Ingrese un documento válido'
      },
      username: {
        required: 'Ingrese un nombre de usuario válido',
      },
      password: {
        required: 'Ingrese una contraseña válida',
        minlength: `La contraseña debe tener al menos ${errors['minlength']?.requiredLength} caracteres`,
        pattern: 'La contraseña debe contener al menos una letra mayuscula, un número y un símbolo'
      }
    };

    const fieldErrors = errorMessages[field];

    if (!fieldErrors) return 'Campo inválido';

    for (const errorKey in errors) {
      if (fieldErrors[errorKey]) {
        return fieldErrors[errorKey];
      }
    }

    return 'Campo inválido';
  }




}


