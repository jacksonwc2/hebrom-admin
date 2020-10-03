import { NgZorroAntdModule, NzFormModule, NzIconModule } from 'ng-zorro-antd';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
} from '@ant-design/icons-angular/icons';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { EventosComponent } from './eventos/eventos.component';
import { LocalizacoesComponent } from './localizacoes/localizacoes.component';
import { PageRoutes } from './pages-routing';
import { PerfilComponent } from './perfil/perfil.component';

const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    NzFormModule,
    RouterModule.forChild(PageRoutes),
    IconsProviderModule,
    NzIconModule.forRoot(icons),
    ScrollingModule,
    NzLayoutModule,
    NzCalendarModule,
    NzAutocompleteModule,
    NzSelectModule,
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
