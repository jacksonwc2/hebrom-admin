import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PageRoutes } from './pages-routing';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EventosComponent } from './eventos/eventos.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { LocalizacoesComponent } from './localizacoes/localizacoes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PageRoutes)
  ],
  declarations: [DashboardComponent, AutenticacaoComponent, CategoriasComponent, EventosComponent, EntidadesComponent, LocalizacoesComponent]
})
export class PagesModule { }
