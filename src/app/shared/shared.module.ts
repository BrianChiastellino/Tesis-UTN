import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../material/material.module';
import { ButtonModule } from 'primeng/button';
import { SearchCoinComponent } from './search-coin/search-coin.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmOperationDialogComponent } from './dialog/confirm-operation-dialog/confirm-operation-dialog.component';
import { ConfirmTransactionDialogComponent } from './confirm-transaction-dialog/confirm-transaction-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { ListTransactionsComponent } from './list-transactions/list-transactions.component';
import { TransactionTypePipe } from './pipe/transactionType.pipe';
import { UserEliminated } from './pipe/user-eliminated.pipe';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    NavBarComponent,
    SearchCoinComponent,
    EditUserDialogComponent,
    ConfirmOperationDialogComponent,
    ConfirmTransactionDialogComponent,
    ListTransactionsComponent,
    TransactionTypePipe,
    UserEliminated
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ButtonModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSortModule,
  ],
  exports:[
    NavBarComponent,
    SearchCoinComponent,
    ListTransactionsComponent,
  ],
  providers: [
  ],
})
export class SharedModule { }
