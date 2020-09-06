import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PageRoutes } from './pages-routing';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PageRoutes)
  ],
  declarations: [DashboardComponent, AutenticacaoComponent]
})
export class PagesModule { }
