import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../material/material.module';
import { ToastComponent } from './toast/toast.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ConfirmDialogComponent } from '../main/components/dialog/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    NavBarComponent,
    ToastComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ToastModule,
    ButtonModule
  ],
  exports:[
    NavBarComponent,
    ToastComponent,
    ConfirmDialogComponent
  ],
  providers: [
    MessageService
  ],
})
export class SharedModule { }
