import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/services/auth.service';

@Component({
  standalone: true,
  imports: [ CommonModule, SharedModule, MaterialModule ],
  selector: 'alone-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.componente.css'

})

export class LandingComponent implements OnInit {

  public isLogin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLogin = isLoggedIn;
    });
  }

  public navigateToRegister() {
    this.router.navigate(['auth/register']);
  }

  public navigateToMarket() {
    this.router.navigateByUrl('main')
  }

}
