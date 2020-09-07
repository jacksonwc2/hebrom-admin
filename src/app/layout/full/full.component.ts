import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css']
})
export class FullComponent implements OnInit {

  /**
   * Atributo que minimiza e expande menu
   */
  isCollapsed = false;

  /**
   * Dados para menu, em caso de submenus utilize
   * atributo "children", alterando level para 2
   * 
   * children: [{level: 2}]
   */
  menus = [
    {
      level: 1,
      title: 'Dashboard',
      icon: 'dashboard',
      router: 'dashboard',
      open: true,
      selected: true,
      disabled: false
    },
    {
      level: 1,
      title: 'Entidades',
      icon: 'dashboard',
      router: 'entidades',
      open: false,
      selected: false,
      disabled: false
    },
    {
      level: 1,
      title: 'Categorias',
      icon: 'dashboard',
      router: 'categorias',
      open: false,
      selected: false,
      disabled: false
    },
    {
      level: 1,
      title: 'Localizações',
      icon: 'dashboard',
      router: 'localizacoes',
      open: false,
      selected: false,
      disabled: false
    },
    {
      level: 1,
      title: 'Eventos',
      icon: 'dashboard',
      router: 'eventos',
      open: false,
      selected: false,
      disabled: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
