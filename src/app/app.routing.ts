import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AutenticacaoGuard } from './guard/autenticacao-guard.guard';
import { AutenticacaoComponent } from './pages/autenticacao/autenticacao.component';

export const AppRoutes: Routes = [
  {
    path: 'login',
    component: AutenticacaoComponent,
  },
  {
    path: '',
    canActivate: [AutenticacaoGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }
    ]
  }
];
