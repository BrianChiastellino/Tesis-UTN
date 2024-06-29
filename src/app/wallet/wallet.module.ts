import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletPageComponent } from './pages/wallet-page/wallet-page.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ListCoinUserComponent } from './components/list-coin-user/list-coin-user.component';


@NgModule({
  declarations: [
    WalletPageComponent,
    ListCoinUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    WalletRoutingModule,
    ReactiveFormsModule
  ]
})
export class WalletModule { }
