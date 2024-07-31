import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionPageComponent } from './pages/transaction-page/transaction-page.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'myTransactions', component: TransactionPageComponent },
      { path: '**', redirectTo: 'myTransactions'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
