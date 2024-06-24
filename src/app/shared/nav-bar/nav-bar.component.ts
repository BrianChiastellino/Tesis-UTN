import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
})

export class NavBarComponent implements OnInit {

  private token: string = environment.userToken;
  public isLogin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isUserLoged();
  }

  private isUserLoged (): void {
    const isLoged = localStorage.getItem( this.token );

    this.isLogin = isLoged ? true : false
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

  public login (): void{
    this.router.navigateByUrl('/auth/login')
  }

  public register (): void{
    this.router.navigateByUrl('/auth/register')
  }

  public logout (): void {
    localStorage.clear();
    this.isLogin = !this.isLogin;
    this.landing();
  }



}
