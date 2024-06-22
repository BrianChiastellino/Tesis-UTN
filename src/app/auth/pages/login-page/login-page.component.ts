import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, filter, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
})

export class LoginPageComponent {

  public loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
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

    this.authService.login(email, password).subscribe( login => {
      if( !login ) return;

      this.router.navigateByUrl('/landing');
    })
  }

  public goToRegister(): void{
    this.router.navigateByUrl('auth/register');
  }



}
