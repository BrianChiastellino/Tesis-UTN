import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';
import { AdminGuard } from './admin/guards/admin.guard';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent,
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
    canActivate: [AuthGuard], //todo:
    canMatch: [AuthGuard]
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then(w => w.WalletModule),
    canActivate: [AuthGuard], //todo:
    canMatch: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(a => a.AdminModule),
    canActivate: [AdminGuard],
    canMatch: [AdminGuard]
  },
  {
    path: '**',
    redirectTo: 'www.google.com',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
