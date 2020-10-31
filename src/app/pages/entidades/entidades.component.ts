import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { take } from 'rxjs/operators';
import { EntidadeService } from 'src/app/core/services/entidade.service';
import { LocalizacaoService } from 'src/app/core/services/localizacao.service';
import { TitleService } from 'src/app/core/services/tittle.service';
import { LocalizacaoDTO } from 'src/app/models/payload/localizacao/localizacao.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  data = [];
  editar = false;

  localizacoes: Array<LocalizacaoDTO>;

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
    private entidadeService: EntidadeService,
    private message: NzMessageService,
    private localizacaoService: LocalizacaoService
  ) {
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

    this.adquirirTodos();

    this.adquirirLocalizacoes();

    this.titleService.atualizar('Entidades');
  }

  private adquirirLocalizacoes() {
    this.localizacaoService
      .adquirirTodas()
      .pipe(take(1))
      .subscribe((localizacoes) => (this.localizacoes = localizacoes));
  }

  private adquirirTodos() {
    this.entidadeService
      .adquirirTodos()
      .pipe(take(1))
      .subscribe((entidades) => {
        this.data = entidades;

        this.pesquisar(this.search.value);
      });
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

  delete(item): void {
    this.modal.confirm({
      nzTitle: 'Atenção!',
      nzContent: 'Tem certeza que deseja remover a entidade?',
      nzOkText: 'Remover',
      nzOkType: 'danger',
      nzOnOk: () => this.deletar(item.id),
      nzCancelText: 'Cancelar',
    });
  }

  private deletar(id) {
    this.entidadeService
      .deletar(id)
      .pipe(take(1))
      .subscribe(() => {
        this.message.success('Entidade excluida com Sucesso!');

        this.adquirirTodos();
      });
  }
}
