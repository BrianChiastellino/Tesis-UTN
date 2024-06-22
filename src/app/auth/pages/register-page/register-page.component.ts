import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/user.model';
import { tap } from 'rxjs';

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {

  public user?: User;

  public registerForm: FormGroup = this.fb.group({

    //todo: Usar validaciones de Devtalles para el mail

    name: ['', Validators.required],
    email: ['', Validators.required],
    document: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    isLoged: [false],

  })

  constructor (
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  public onSubmit() {

    this.registerForm.markAllAsTouched();

    if( !this.registerForm.valid ) return;

    this.createUser();

  }

  private createUser(): void{

    this.user = new User({ ...this.registerForm.value as User })

    this.authService.registerUser(this.user).subscribe( register => {
      if( !register ) return;

      this.router.navigateByUrl('auth/login');
    });






  }



}


