import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, filter, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { environment } from '../../../../environments/environment';
import { CustomValidators } from '../../../shared/validators/custom-validators';
import { CustomHelpers } from '../../../shared/helpers/custom-helpers';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {

  public hidePassword: boolean = true;
  private userToken: string = environment.userToken;

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(CustomValidators.emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(CustomValidators.passwordPattern)]]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) { }

  public onSubmit(): void {

    if (!this.loginForm.valid) return;

    this.login();

  }

  public login(): void{

    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.login(email, password).subscribe( user => {

      if( !user ) {
        this.loginForm.reset();
        return this.toastService.showError('Error', 'Email o contraseña invalidos');
      }

      localStorage.setItem(this.userToken, JSON.stringify(user));

      if(user.admin) this.router.navigateByUrl('/admin/landing')
        else  this.router.navigateByUrl('/landing');

      this.toastService.showSuccess(`Éxito!`, 'Has iniciado sesion correctamente');

    })
  }

  public showPassword () : void  {
    this.hidePassword = !this.hidePassword;
  }

  public isValidfield( field: string ): boolean | null {
    return CustomHelpers.isValidField( field, this.loginForm );
  }


}
