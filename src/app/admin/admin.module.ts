import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListTransactionsComponent } from './components/list-transactions/list-transactions.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ShowUserDialogComponent } from './components/show-user-dialog/show-user-dialog.component';
import { TransactionTypePipe } from './pipe/transactionType.pipe';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { ShowWalletDialogComponent } from './components/show-wallet-dialog/show-wallet-dialog.component';
import { UserEliminated } from './pipe/user-eliminated.pipe';
import { UserType } from './pipe/admin-type.pipe';



@NgModule({
  declarations: [
    ListTransactionsComponent,
    TransactionsPageComponent,
    ShowUserDialogComponent,
    TransactionTypePipe,
    ListUsersComponent,
    UsersPageComponent,
    ShowWalletDialogComponent,
    UserEliminated,
    UserType
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AdminModule { }
