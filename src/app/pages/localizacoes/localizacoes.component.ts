import { NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-localizacoes',
  templateUrl: './localizacoes.component.html',
  styleUrls: ['./localizacoes.component.css'],
})
export class LocalizacoesComponent implements OnInit {
  dataFilter = [];
  data = [
    {
      descricao: 'Templo Sede',
      uri: 'https://goo.gl/maps/SV2K1qdyqU7tuToG6',
      observacao: 'Próximo ao mercado Treviso.',
    },
    {
      descricao: 'Templo Sede',
      uri: 'https://goo.gl/maps/SV2K1qdyqU7tuToG6',
      observacao: 'Próximo ao mercado Treviso.',
    },
    {
      descricao: 'Templo Sede',
      uri: 'https://goo.gl/maps/SV2K1qdyqU7tuToG6',
      observacao: 'Próximo ao mercado Treviso.',
    },
    {
      descricao: 'Templo Sede',
      uri: 'https://goo.gl/maps/SV2K1qdyqU7tuToG6',
      observacao: 'Próximo ao mercado Treviso.',
    },
    {
      descricao: 'Templo Sede',
      uri: 'https://goo.gl/maps/SV2K1qdyqU7tuToG6',
      observacao: 'Próximo ao mercado Treviso.',
    },
    {
      descricao: 'Templo Sede',
      uri: 'https://goo.gl/maps/SV2K1qdyqU7tuToG6',
      observacao: 'Próximo ao mercado Treviso.',
    },
    {
      descricao: 'Templo Sede',
      uri: 'https://goo.gl/maps/SV2K1qdyqU7tuToG6',
      observacao: 'Próximo ao mercado Treviso.',
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
      descricao: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      uri: ['', Validators.compose([Validators.required])],
      observacao: '',
      id: '',
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
      descricao: this.editar ? item.descricao : '',
      uri: this.editar ? item.uri : '',
      observacao: this.editar ? item.observacao : '',
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
      nzContent: 'Tem certeza que deseja remover a Localização?',
      nzOkText: 'Remover',
      nzOkType: 'danger',
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
