import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../material/material.module';
import { ToastComponent } from './toast/toast.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    NavBarComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ToastModule,
    ButtonModule
  ],
  exports:[
    NavBarComponent,
    ToastComponent
  ],
  providers: [
    MessageService
  ],
})
export class SharedModule { }
