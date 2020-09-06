import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;

  readonly CATEGORIAS = 'Categorias';
  readonly TODAS_CATEGORIAS = 'Todas Categorias';
  readonly NOVA_CATEGORIA = 'Nova Categoria';

}

