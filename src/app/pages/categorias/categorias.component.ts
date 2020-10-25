import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { take } from 'rxjs/operators';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { TitleService } from 'src/app/core/services/tittle.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
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
    private categoriaService: CategoriaService,
    private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      descricao: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      id: null,
    });
  }

  ngOnInit(): void {
    this.adquirirTodos();
    this.search = this.fb.group({
      search: '',
    });

    this.dataFilter = this.data;
    this.titleService.atualizar('Categoria');
  }

  private adquirirTodos() {
    this.categoriaService
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
      id: this.editar ? item.id : null,
    });
  }

  handleOk(): void {
    this.categoriaService
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
      nzContent: 'Tem certeza que deseja remover a categoria?',
      nzOkText: 'Remover',
      nzOkType: 'danger',
      nzOnOk: () => this.deletar(item.id),
      nzCancelText: 'Cancelar',
    });
  }

  private deletar(id) {
    this.categoriaService
      .deletar(id)
      .pipe(take(1))
      .subscribe(() => {
        this.message.success('Categoria excluida com Sucesso!');
        this.adquirirTodos();
      });
  }
}
