import { AutenticacaoGuard } from 'src/app/core/guard/autenticacao-guard.guard';
import { MuseuComponent } from 'src/app/pages/museu/museu.component';
import { Routes } from '@angular/router';
import { FullComponent } from './layout/full/full.component';
import { AutenticacaoComponent } from './pages/autenticacao/autenticacao.component';

export const AppRoutes: Routes = [
  {
    path: 'autenticacao',
    component: AutenticacaoComponent,
  },
  {
    path: 'museu',
    component: MuseuComponent,
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
