import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../../auth/models/user.model';

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.components.css'
})

export class NavBarComponent implements OnInit {

  private token: string = environment.userToken;
  public isLogin: boolean = false;
  public isAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isUserLoged();
  }

  private isUserLoged (): void {

    const isLoged = localStorage.getItem( this.token );
    const user: User = JSON.parse(localStorage.getItem( this.token )!);

    user ? this.isLogin = true : this.isLogin = false;
    user ? this.isAdmin = user.admin : this.isAdmin = false;

  }

  public landing (): void {
    this.router.navigateByUrl('landing');
  }

  public main (): void {
    this.router.navigateByUrl('main')
  }

  public wallet (): void {
    this.router.navigateByUrl('wallet');
  }

  public transictions () : void {
    this.router.navigateByUrl('/admin/transactions');
  }

  public users () : void {
    this.router.navigateByUrl('admin/users');
  }

  public login (): void{
    this.router.navigateByUrl('/auth/login')
  }

  public register (): void{
    this.router.navigateByUrl('/auth/register')
  }

  public logout (): void {
    localStorage.clear();
    this.isLogin = !this.isLogin;
    this.isAdmin = false;
    this.landing();
  }



}
