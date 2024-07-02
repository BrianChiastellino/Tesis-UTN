import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'transactions', component: TransactionsPageComponent },
      { path: '**', redirectTo: 'transactions'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
