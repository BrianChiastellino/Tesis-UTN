import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListTransactionsComponent } from './components/list-transactions/list-transactions.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ShowUserDialogComponent } from './components/show-user-dialog/show-user-dialog.component';
import { TransactionTypePipe } from './pipe/transactionType.pipe';



@NgModule({
  declarations: [
    ListTransactionsComponent,
    TransactionsPageComponent,
    ShowUserDialogComponent,
    TransactionTypePipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AdminModule { }
