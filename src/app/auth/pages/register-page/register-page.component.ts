import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { filter, pipe, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html',

})
export class RegisterPageComponent implements OnInit {

  public hidePassword: boolean  = true;
  private userToken: string = environment.userToken;

  public registerForm: FormGroup = this.fb.group({

    //todo: Usar validaciones de Devtalles para el mail

    name: ['', Validators.required],
    email: ['', Validators.required],
    document: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    admin: [false],

  })

  constructor (
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {

  }

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

      // localStorage.setItem(this.userToken, JSON.stringify(user));
      this.router.navigateByUrl('auth/login')
      this.toastService.showSuccess('Éxtio!', 'Te has registrado extiosamente');

    });



  }
  public showPassword () : void {
    this.hidePassword = !this.hidePassword;
  }



}


