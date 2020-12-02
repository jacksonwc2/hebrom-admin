import { GoogleChartsModule } from 'angular-google-charts';
import { NgZorroAntdModule, NzFormModule, NzIconModule } from 'ng-zorro-antd';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { AcervoComponent } from 'src/app/pages/acervo/acervo.component';
import { CadastroFuncionarioComponent } from 'src/app/pages/cadastro-funcionario/cadastro-funcionario.component';
import { EspacoComponent } from 'src/app/pages/espaco/espaco.component';
import { LocalizacoesComponent } from 'src/app/pages/localizacoes/localizacoes.component';
import { MuseuComponent } from 'src/app/pages/museu/museu.component';
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
    NzUploadModule,
    GoogleChartsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    DashboardComponent,
    AutenticacaoComponent,
    CategoriasComponent,
    EventosComponent,
    EntidadesComponent,
    PerfilComponent,
    EspacoComponent,
    AcervoComponent,
    MuseuComponent,
    LocalizacoesComponent,
    CadastroFuncionarioComponent,
  ],
})
export class PagesModule {}
