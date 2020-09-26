import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { EventosComponent } from './eventos/eventos.component';
import { LocalizacoesComponent } from './localizacoes/localizacoes.component';
import { PageRoutes } from './pages-routing';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(PageRoutes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    DashboardComponent,
    AutenticacaoComponent,
    CategoriasComponent,
    EventosComponent,
    EntidadesComponent,
    LocalizacoesComponent,
    PerfilComponent,
  ],
})
export class PagesModule {}
