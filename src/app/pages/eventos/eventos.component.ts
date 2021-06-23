import { NzMessageService, NzModalService, NzUploadFile } from 'ng-zorro-antd';
import { switchMap, take } from 'rxjs/operators';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { EntidadeService } from 'src/app/core/services/entidade.service';
import { EventoService } from 'src/app/core/services/evento.service';
import { LocalizacaoService } from 'src/app/core/services/localizacao.service';
import { TitleService } from 'src/app/core/services/tittle.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

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

  fileList = [];
  categorias = [];
  localizacoes = [];
  entidades = [];
  dataFilter = [];
  data = [];
  editar = false;
  search: FormGroup;
  isVisible = false;
  validateForm: FormGroup;
  selectedValue = null;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private titleService: TitleService,
    private eventosService: EventoService,
    private message: NzMessageService,
    private entidadeService: EntidadeService,
    private localizacaoService: LocalizacaoService,
    private categoriaService: CategoriaService
  ) {
    this.validateForm = this.fb.group({
      titulo: [null, [Validators.required]],
      descricao: null,
      codigoEntidade: [null, [Validators.required]],
      codigoCategoria: [null, [Validators.required]],
      codigoLocalizacao: [null, [Validators.required]],
      dataInicio: [null, [Validators.required]],
      dataFinal: null,
      banner: null,
      id: null,
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList.push(file);
    return false;
  };

  removeFile = (file) => this.fileList.splice(this.fileList.indexOf(file), 1);

  ngOnInit(): void {
    this.search = this.fb.group({
      search: '',
    });

    this.adquirirTodos();

    this.entidadeService
      .adquirirTodos()
      .pipe(take(1))
      .subscribe((entidades) => (this.entidades = entidades));

    this.categoriaService
      .adquirirTodas()
      .pipe(take(1))
      .subscribe((categorias) => (this.categorias = categorias));

    this.localizacaoService
      .adquirirTodas()
      .pipe(take(1))
      .subscribe((localizacoes) => (this.localizacoes = localizacoes));

    this.titleService.atualizar('Eventos');
  }

  private adquirirTodos() {
    this.eventosService
      .adquirirTodos()
      .pipe(take(1))
      .subscribe((eventos) => {
        this.data = eventos;

        this.pesquisar(this.search.value);
      });
  }

  pesquisar(value) {
    if (value.search === '') {
      this.dataFilter = this.data;
      return;
    }

    this.dataFilter = this.data.filter(
      (x) => this.unaccent(x.titulo)?.indexOf(this.unaccent(value.search)) > -1
    );
  }

  unaccent(value) {
    return value
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[^a-zA-Zs]/g, '');
  }

  submitForm(value): void {
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
      titulo: this.editar ? item.titulo : '',
      descricao: this.editar ? item.descricao : '',
      codigoEntidade: this.editar ? item.codigoEntidade : null,
      codigoCategoria: this.editar ? item.codigoCategoria : null,
      codigoLocalizacao: this.editar ? item.codigoLocalizacao : null,
      dataInicio: this.editar ? moment(item.dataInicio, 'DD/MM/YYYY hh:mm').format() : null,
      dataFinal: this.editar ? this.setarData(item) : null,
      banner: this.editar ? null : null,
      id: this.editar ? item.id : null,
    });
  }

  private setarData(item) {
    if (!item?.dataFinal) {
      return null;
    }

    return moment(item.dataFinal, 'DD/MM/YYYY hh:mm').format()
  }

  handleOk(): void {
    this.eventosService
      .upload(this.fileList)
      .pipe(
        switchMap((banner: any) => {
          const eventoDTO = this.validateForm.value;
          eventoDTO.banner = banner.valor;

          return this.eventosService.salvar(eventoDTO);
        }),
        take(1)
      )
      .subscribe((x) => {
        this.message.success('Dados Salvos com Sucesso!');

        this.isVisible = false;

        this.validateForm.reset();

        this.adquirirTodos();
      });
  }

  handleCancel(): void {
    this.isVisible = false;

    this.validateForm.reset();
  }

  delete(item): void {
    this.modal.confirm({
      nzTitle: 'Atenção!',
      nzContent: 'Tem certeza que deseja remover o evento?',
      nzOkText: 'Remover',
      nzOkType: 'danger',
      nzOnOk: () => this.deletar(item.id),
      nzCancelText: 'Cancelar',
    });
  }

  private deletar(id) {
    this.eventosService
      .deletar(id)
      .pipe(take(1))
      .subscribe(() => {
        this.message.success('Evento excluido com Sucesso!');

        this.adquirirTodos();
      });
  }
}
