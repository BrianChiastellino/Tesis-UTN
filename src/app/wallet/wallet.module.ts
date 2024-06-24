import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletPageComponent } from './pages/wallet-page/wallet-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    WalletPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WalletRoutingModule
  ]
})
export class WalletModule { }
