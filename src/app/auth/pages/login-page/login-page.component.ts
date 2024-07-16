import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, filter, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
})

export class LoginPageComponent {

  public hidePassword: boolean = true;
  private userToken: string = environment.userToken;

  public loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) { }

  public onSubmit(): void {

    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) return;

    this.login();

    this.loginForm.reset();

  }

  public login(): void{

    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    console.log({ email,password });

    this.authService.login(email, password).subscribe( user => {
      if( !user ) return;

      localStorage.setItem(this.userToken, JSON.stringify(user));
      this.toastService.showSuccess(`Éxito!`, 'Has iniciado sesion correctamente');
      this.router.navigateByUrl('/landing');
    })
  }

  public showPassword () : void  {
    this.hidePassword = !this.hidePassword;
  }


}
