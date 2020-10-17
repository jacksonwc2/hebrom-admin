import { AutenticacaoGuard } from 'src/app/core/guard/autenticacao-guard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layout/full/full.component';
import { AutenticacaoComponent } from './pages/autenticacao/autenticacao.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

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
        pathMatch: 'full',
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
];
