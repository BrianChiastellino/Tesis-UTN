import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListTransactionsComponent } from './components/list-transactions/list-transactions.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';


@NgModule({
  declarations: [
    ListTransactionsComponent,
    TransactionsPageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
