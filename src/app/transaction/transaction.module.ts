import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionPageComponent } from './pages/transaction-page/transaction-page.component';
import { SharedModule } from "../shared/shared.module";
import { TransactionRoutingModule } from './transaction-routing.module';



@NgModule({
  declarations: [
    TransactionPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransactionRoutingModule

]
})
export class TransactionModule { }
