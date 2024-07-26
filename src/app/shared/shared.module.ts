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
import { MatMenuModule } from '@angular/material/menu'; // Importa el módulo para el menú


@NgModule({
  declarations: [
    NavBarComponent,
    SearchCoinComponent,
    EditUserDialogComponent,
    ConfirmOperationDialogComponent,
    ConfirmTransactionDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ButtonModule,
    ReactiveFormsModule,
    MatMenuModule
  ],
  exports:[
    NavBarComponent,
    SearchCoinComponent
  ],
  providers: [
  ],
})
export class SharedModule { }
