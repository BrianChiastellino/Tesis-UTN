import { Component, OnInit } from '@angular/core';
import { User } from '../../../auth/models/user.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent implements OnInit  {


  public users: User[] = [];

  constructor (
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() : void {
    this.authService.getAllUsers
    .subscribe( users => this.users = users )
  }




}
