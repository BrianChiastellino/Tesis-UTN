import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletPageComponent } from './pages/wallet-page/wallet-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'myWallet', component: WalletPageComponent},
      { path: '**', redirectTo: 'myWallet' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
