import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AutenticacaoGuard } from './guard/autenticacao-guard.guard';
import { AutenticacaoComponent } from './pages/autenticacao/autenticacao.component';
import { FullComponent } from './layout/full/full.component';

export const AppRoutes: Routes = [
  {
    path: 'autenticacao',
    component: AutenticacaoComponent,
  },
  {
    path: '',
    canActivate: [AutenticacaoGuard],
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/pages',
        pathMatch: 'full'
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }
    ]
  }
];
