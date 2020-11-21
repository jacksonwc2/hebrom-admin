import { AcervoComponent } from 'src/app/pages/acervo/acervo.component';
import { EspacoComponent } from 'src/app/pages/espaco/espaco.component';
import { Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { EventosComponent } from './eventos/eventos.component';

export const PageRoutes: Routes = [
  { path: '', component: EntidadesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'entidades', component: EntidadesComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'acervo', component: AcervoComponent },
  { path: 'espaco', component: EspacoComponent },
  { path: 'eventos', component: EventosComponent },
];
