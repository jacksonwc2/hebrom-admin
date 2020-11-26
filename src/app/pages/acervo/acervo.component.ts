import { NzMessageService, NzModalService, NzUploadFile } from 'ng-zorro-antd';
import { take } from 'rxjs/operators';
import { AcervoService } from 'src/app/core/services/acervo.service';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { EspacoService } from 'src/app/core/services/espaco.service';
import { TitleService } from 'src/app/core/services/tittle.service';
import { LocalizacaoDTO } from 'src/app/models/payload/localizacao/localizacao.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-acervo',
  templateUrl: './acervo.component.html',
  styleUrls: ['./acervo.component.css'],
})
export class AcervoComponent implements OnInit {
  readonly NOME = 'Nome';
  readonly DESCRICAO = 'Descrição';
  readonly CATEGORIA = 'Categoria';
  readonly ESPACO = 'Espaço';
  readonly ATIVO = 'Ativo';
  readonly STATUS = 'Status';
  readonly DATA = 'Data Cadastro';
  readonly ACOES = 'AÇÕES';
  readonly ADICIONAR = 'ADICIONAR';

  readonly EXCECAO_NAO_HA_DADOS = 'Não há Dados.';
  readonly EXCECAO_ENSIRA_NOME = 'Insira o nome.';
  readonly EXCECAO_INSIRA_DESCRICAO = 'Insira o descrição';
  readonly EXCECAO_MINIMO_CARACTERES = 'Insira no mínimo 3 caracteres.';
  readonly EXCECAO_MAXIMO_CARACTERES = 'Insira no máximo 255 caracteres.';

  readonly EXCECAO_ENSIRA_DATACADASTRO = 'Insira a data cadastro.';
  readonly EXCECAO_MINIMO_DATACADASTRO = 'Insira no mínimo 14 caracteres.';
  readonly EXCECAO_MAXIMO_DATACADASTRO = 'Insira no máximo 18 caracteres.';

  dataFilter = [];
  data = [];
  editar = false;
  fileList = [];

  localizacoes: Array<LocalizacaoDTO>;

  /**
   * Formulario para filtragem do menu
   */
  search: FormGroup;
  isVisible = false;

  espacos = [];
  categorias = [];

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private titleService: TitleService,
    private entidadeService: AcervoService,
    private message: NzMessageService,
    private categoriaService: CategoriaService,
    private espacoService: EspacoService
  ) {
    this.validateForm = this.fb.group({
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ]),
      ],
      descricao: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ]),
      ],
      codigoCategoria: ['', Validators.compose([Validators.required])],
      codigoEspaco: ['', Validators.compose([Validators.required])],
      flagAtivo: ['', Validators.compose([Validators.required])],
      codigoAcervoStatus: ['', Validators.compose([Validators.required])],
      dataCadastro: ['', Validators.compose([Validators.required])],
      id: null,
    });
  }

  ngOnInit(): void {
    this.search = this.fb.group({
      search: '',
    });
    this.dataFilter = this.data;

    this.adquirirTodos();

    this.titleService.atualizar('Acervo');
  }

  private adquirirTodos() {
    this.entidadeService
      .adquirirTodos()
      .pipe(take(1))
      .subscribe((entidades) => {
        this.data = entidades;

        this.pesquisar(this.search.value);
      });

    this.categoriaService
      .adquirirTodas()
      .pipe(take(1))
      .subscribe((categoria) => (this.categorias = categoria));

    this.espacoService
      .adquirirTodos()
      .pipe(take(1))
      .subscribe((espacos) => (this.espacos = espacos));
  }

  pesquisar(value) {
    if (value.search === '') {
      this.dataFilter = this.data;
      return;
    }

    this.dataFilter = this.data.filter(
      (x) =>
        this.unaccent(x.nomeFantasia)?.indexOf(this.unaccent(value.search)) > -1
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
      nome: this.editar ? item.nome : '',
      descricao: this.editar ? item.descricao : '',
      codigoCategoria: this.editar ? item.codigoCategoria : '',
      codigoEspaco: this.editar ? item.codigoEspaco : '',
      flagAtivo: this.editar ? item.flagAtivo : '',
      codigoAcervoStatus: this.editar ? item.codigoAcervoStatus : '',
      dataCadastro: this.editar ? item.dataCadastro : '',
      id: null,
    });
  }

  handleOk(): void {
    if (this.fileList.length > 0) {
      this.entidadeService
        .upload(this.fileList)
        .pipe(take(1))
        .subscribe((x) => {
          this.fileList = [];
          this.salvarAcervo(x);
        });
    } else {
      this.salvarAcervo();
    }
  }

  salvarAcervo(x?) {
    const parametros = this.validateForm.value;

    debugger;
    if (x != null) {
      parametros.files = x;
    }

    this.entidadeService
      .salvar(parametros)
      .pipe(take(1))
      .subscribe((x) => {
        this.message.success('Acervo salva com sucesso!');
        this.isVisible = false;
        this.adquirirTodos();
      });
  }

  handleCancel(): void {
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

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList.push(file);
    return false;
  };

  removeFile = (file) => this.fileList.splice(this.fileList.indexOf(file), 1);
}