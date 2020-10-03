import { NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.css'],
})
export class EntidadesComponent implements OnInit {
  readonly NOME = 'Nome';
  readonly RAZAO_SOCIAL = 'Razão Social';
  readonly DOCUMENTO = 'Documento';
  readonly LOCALIZACAO = 'Localização';
  readonly ACOES = 'Ações';
  readonly ADICIONAR = 'Adicionar';

  readonly EXCECAO_NAO_HA_DADOS = 'Não há Dados.';
  readonly EXCECAO_ENSIRA_NOME = 'Insira o nome.';
  readonly EXCECAO_MINIMO_CARACTERES = 'Insira no mínimo 3 caracteres.';
  readonly EXCECAO_MAXIMO_CARACTERES = 'Insira no máximo 255 caracteres.';

  readonly EXCECAO_INSIRA_RAZAO_SOCIAL = 'Insira a razão social.';

  readonly EXCECAO_ENSIRA_DOCUMENTO = 'Insira o documento.';
  readonly EXCECAO_MINIMO_DOCUMENTO = 'Insira no mínimo 14 caracteres.';
  readonly EXCECAO_MAXIMO_DOCUMENTO = 'Insira no máximo 18 caracteres.';

  readonly EXCECAO_ESCOLHA_LOCALIZACAO = 'Escolha uma localização.';

  dataFilter = [];
  data = [
    {
      nome_fantasia: 'Entidade',
      razao_social: 'Entidade',
      documento: 'Entidade',
      localizacao: 'Entidade',
    },
    {
      nome_fantasia: 'Entidade',
      razao_social: 'Entidade',
      documento: 'Entidade',
      localizacao: 'Entidade',
    },
  ];
  editar = false;

  /**
   * Formulario para filtragem do menu
   */
  search: FormGroup;
  isVisible = false;

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private modal: NzModalService) {
    this.validateForm = this.fb.group({
      nome_fantasia: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ]),
      ],
      razao_social: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ]),
      ],
      documento: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(18),
        ]),
      ],
      localizacao: [null, [Validators.required]],
      id: null,
    });
  }

  ngOnInit(): void {
    this.search = this.fb.group({
      search: '',
    });
    this.dataFilter = this.data;
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
      nome_fantasia: this.editar ? item.nome_fantasia : '',
      razao_social: this.editar ? item.razao_social : '',
      documento: this.editar ? item.documento : '',
      localizacao: this.editar ? item.localizacao : '',
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
