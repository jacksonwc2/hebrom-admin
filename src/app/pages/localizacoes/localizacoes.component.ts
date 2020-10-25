import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { take } from 'rxjs/operators';
import { LocalizacaoService } from 'src/app/core/services/localizacao.service';
import { TitleService } from 'src/app/core/services/tittle.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-localizacoes',
  templateUrl: './localizacoes.component.html',
  styleUrls: ['./localizacoes.component.css'],
})
export class LocalizacoesComponent implements OnInit {
  dataFilter = [];
  data = [];
  editar = false;

  /**
   * Formulario para filtragem do menu
   */
  search: FormGroup;
  isVisible = false;

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private titleService: TitleService,
    private localizacaoService: LocalizacaoService,
    private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      descricao: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      uriMaps: ['', Validators.compose([Validators.required])],
      observacao: '',
      id: '',
    });
  }

  ngOnInit(): void {
    this.search = this.fb.group({
      search: '',
    });
    this.adquirirTodos();
    this.titleService.atualizar('Localizações');
  }

  private adquirirTodos() {
    this.localizacaoService
      .adquirirTodas()
      .pipe(take(1))
      .subscribe((retorno) => {
        this.data = retorno;
        this.pesquisar(this.search.value);
      });
  }

  pesquisar(value) {
    if (value.search === '') {
      this.dataFilter = this.data;
      return;
    }

    this.dataFilter = this.data.filter(
      (x) =>
        this.unaccent(x.descricao)?.indexOf(this.unaccent(value.search)) > -1
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
      uriMaps: this.editar ? item.uriMaps : '',
      observacao: this.editar ? item.observacao : '',
      id: this.editar ? item.id : '',
    });
  }

  handleOk(): void {
    this.localizacaoService
      .salvar(this.validateForm.value)
      .pipe(take(1))
      .subscribe((x) => {
        this.message.success('Dados Salvos com Sucesso!');
        this.isVisible = false;
        this.adquirirTodos();
      });
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  delete(item): void {
    this.modal.confirm({
      nzTitle: 'Atenção!',
      nzContent: 'Tem certeza que deseja remover a Localização?',
      nzOkText: 'Remover',
      nzOkType: 'danger',
      nzOnOk: () => this.deletar(item.id),
      nzCancelText: 'Cancelar',
    });
  }

  private deletar(id) {
    this.localizacaoService
      .deletar(id)
      .pipe(take(1))
      .subscribe(() => {
        this.message.success('Localização excluida com Sucesso!');
        this.adquirirTodos();
      });
  }
}
