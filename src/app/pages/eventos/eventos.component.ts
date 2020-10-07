import { NzModalService } from 'ng-zorro-antd';
import { TitleService } from 'src/assets/services/tittle.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  readonly LOCALIZACAO = 'Localização';
  readonly TITULO = 'Titulo';
  readonly DESCRICAO = 'Descrição';
  readonly ENTIDADE = 'Entidade';
  readonly CATEGORIA = 'Categoria';
  readonly DATA_INICIO = 'Data inicial';
  readonly DATA_FINAL = 'Data final';
  readonly BANNER = 'Banner';
  readonly ACOES = 'Ações';

  dataFilter = [];
  data = [
    {
      titulo: 'Entidade',
      descricao: 'Entidade',
      entidade: 'Entidade',
      categoria: 'Entidade',
      localizacao: 'Entidade',
      dataInicio: 'Entidade',
      dataFinal: 'Entidade',
      banner: 'banner',
    },
    {
      titulo: 'Entidade',
      descricao: 'Entidade',
      entidade: 'Entidade',
      categoria: 'Entidade',
      localizacao: 'Entidade',
      dataInicio: 'Entidade',
      dataFinal: 'Entidade',
      banner: 'banner',
    },
  ];
  editar = false;

  /**
   * Formulario para filtragem do menu
   */
  search: FormGroup;
  isVisible = false;
  validateForm: FormGroup;
  selectedValue = null;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private titleService: TitleService
  ) {
    this.validateForm = this.fb.group({
      titulo: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      entidade: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      localizacao: [null, [Validators.required]],
      dataInicio: [null, [Validators.required]],
      dataFinal: [null, [Validators.required]],
      banner: [null, [Validators.required]],
      id: null,
    });
  }

  ngOnInit(): void {
    this.search = this.fb.group({
      search: '',
    });
    this.dataFilter = this.data;

    this.titleService.atualizar('Eventos');
  }

  pesquisar(value) {
    if (value.search === '') {
      this.dataFilter = this.data;
      return;
    }

    this.dataFilter = this.data.filter(
      (x) => this.unaccent(x)?.indexOf(this.unaccent(value.search)) > -1
    );
  }

  unaccent(value) {
    return value
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[^a-zA-Zs]/g, '');
  }

  submitForm(value: { descricao: string }): void {
    for (const key of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  showModal(item?: any): void {
    this.isVisible = true;
    this.editar = item != null;
    this.validateForm.setValue({
      descricao: item || '',
      id: null,
    });
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  delete(): void {
    this.modal.confirm({
      nzTitle: 'Atenção!',
      nzContent: 'Tem certeza que deseja remover a entidade?',
      nzOkText: 'Remover',
      nzOkType: 'danger',
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
