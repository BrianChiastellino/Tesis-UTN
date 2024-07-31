import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';
import { AdminGuard } from './admin/guards/admin.guard';
import { NotAdminGuard } from './auth/guards/not-admin.guard';

const routes: Routes = [
  {
    path: 'landing',
    loadComponent: () => import('./landing/landing.component').then( l => l.LandingComponent),
    canActivate: [NotAdminGuard],
    canMatch: [NotAdminGuard],
  },
  {
    path: 'contact',
    loadComponent: () => import('./contacto/contacto.component').then ( c => c.ContactComponent),
    canActivate: [NotAdminGuard],
    canMatch: [NotAdminGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(a => a.AuthModule),
    canActivate: [PublicGuard],
    canMatch: [PublicGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard],
    canMatch: [AuthGuard]
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then(w => w.WalletModule),
    canActivate: [AuthGuard],
    canMatch: [AuthGuard]
  },
  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction.module').then( t => t.TransactionModule),
    canActivate: [AuthGuard],
    canMatch:[AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(a => a.AdminModule),
    canActivate: [AdminGuard],
    canMatch: [AdminGuard]
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
