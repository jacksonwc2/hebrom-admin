import { FullComponent } from 'src/app/layout/full/full.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { EventosComponent } from './eventos/eventos.component';
import { LocalizacoesComponent } from './localizacoes/localizacoes.component';

export const PageRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'entidades', component: EntidadesComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'localizacoes', component: LocalizacoesComponent },
  { path: 'eventos', component: EventosComponent },
  { path: '', component: DashboardComponent },
];
