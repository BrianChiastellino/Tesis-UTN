import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { MarketPageComponent } from './pages/market-page/market-page.component';
import { MainRoutingModule } from './main-routing.module';
import { ListCoinGeckoComponent } from './components/list-coin-gecko/list-coin-gecko.component';


@NgModule({
  declarations: [
    MarketPageComponent,
    ListCoinGeckoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    MaterialModule
  ]
})

export class MainModule { }
