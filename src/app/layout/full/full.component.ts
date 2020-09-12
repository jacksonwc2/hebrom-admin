import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PerfilComponent } from 'src/app/pages/perfil/perfil.component';

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

  /**
   * Filtragem dos itens do menu
   */
  menusFilter = this.menus;

  /**
   * Formulario para filtragem do menu
   */
  searchMenu: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {

    this.searchMenu = this.fb.group({
      search: ""
    });

  }

  unaccent(value) {
    return value?.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "");
  }

  pesquisarMenu(value) {

    if (value.search === "") {
      this.menusFilter = this.menus;
      return;
    }

    this.menusFilter = this.menus.filter(x => this.unaccent(x.title)?.indexOf(this.unaccent(value.search)) > -1);
  }


  openRoute(rota: string) {
    this.router.navigate(['pages/' + rota]);
  }

  perfil() {
    this.modalService.create({
      nzTitle: 'Meu Perfil',
      nzContent: PerfilComponent
    });
  }

  sair(){
    localStorage.setItem('logado', 'false');
    this.router.navigate(['autenticacao']);
  }

}
