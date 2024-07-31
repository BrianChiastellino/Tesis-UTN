import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ShowUserDialogComponent } from './components/show-user-dialog/show-user-dialog.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { ShowWalletDialogComponent } from './components/show-wallet-dialog/show-wallet-dialog.component';
import { UserType } from './pipe/admin-type.pipe';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    TransactionsPageComponent,
    ShowUserDialogComponent,
    ListUsersComponent,
    UsersPageComponent,
    ShowWalletDialogComponent,
    UserType,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
    MatSortModule
  ]
})
export class AdminModule { }
