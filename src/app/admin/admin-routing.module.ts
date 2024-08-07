import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'transactions', component: TransactionsPageComponent },
      { path: 'users', component: UsersPageComponent },
      { path: 'landing', component: LandingPageComponent },
      { path: '**', redirectTo: 'transactions'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
