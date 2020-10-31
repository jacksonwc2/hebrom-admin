import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { take } from 'rxjs/operators';
import { EventoService } from 'src/app/core/services/evento.service';
import { TitleService } from 'src/app/core/services/tittle.service';
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
  data = [];
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
    private titleService: TitleService,
    private eventosService: EventoService,
    private message: NzMessageService
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

    this.adquirirTodos();

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
