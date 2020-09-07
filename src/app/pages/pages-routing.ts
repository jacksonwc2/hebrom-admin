import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { LocalizacoesComponent } from './localizacoes/localizacoes.component';
import { EventosComponent } from './eventos/eventos.component';

export const PageRoutes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'entidades', component: EntidadesComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'localizacoes', component: LocalizacoesComponent },
  { path: 'eventos', component: EventosComponent }
];
