import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { take } from 'rxjs/operators';
import { CadastroFuncionarioService } from 'src/app/core/services/cadastro-funcionario.service';
import { TitleService } from 'src/app/core/services/tittle.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css'],
})
export class CadastroFuncionarioComponent implements OnInit {
  dataFilter = [];
  data = [];
  editar = false;

  readonly LOGIN = 'Login';
  readonly SENHA = 'Senha';
  readonly PREMISSAO_EDITAR = 'Editar';
  readonly PREMISSAO_EXCLUIR = 'Excluir';
  readonly PREMISSAO_CADASTRAR = 'Cadastrar';
  readonly ACOES = 'Ações';
  readonly ADICIONAR = 'ADICIONAR';

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
    private cadastroFuncionarioService: CadastroFuncionarioService,
    private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      login: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      senha: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      flagEditar: [false, Validators.compose([Validators.required])],
      flagExcluir: [false, Validators.compose([Validators.required])],
      flagCadastrar: [false, Validators.compose([Validators.required])],
      id: null,
    });
  }

  ngOnInit(): void {
    this.adquirirTodos();
    this.search = this.fb.group({
      search: '',
    });

    this.dataFilter = this.data;
    this.titleService.atualizar('Cadastro Funcionario');
  }

  private adquirirTodos() {
    this.cadastroFuncionarioService
      .adquirirTodos()
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
      login: this.editar ? item.login : '',
      senha: this.editar ? item.senha : '',
      flagEditar: this.editar ? item.flagEditar : '',
      flagCadastrar: this.editar ? item.flagCadastrar : '',
      flagExcluir: this.editar ? item.flagExcluir : '',
      id: this.editar ? item.id : null,
    });
  }

  handleOk(): void {
    this.cadastroFuncionarioService
      .salvar(this.validateForm.value)
      .pipe(take(1))
      .subscribe((x) => {
        this.message.success('Funcionario salvo com Sucesso!');
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
      nzContent: 'Tem certeza que deseja remover o funcionario?',
      nzOkText: 'Remover',
      nzOkType: 'danger',
      nzOnOk: () => this.deletar(item.id),
      nzCancelText: 'Cancelar',
    });
  }

  private deletar(id) {
    this.cadastroFuncionarioService
      .deletar(id)
      .pipe(take(1))
      .subscribe(() => {
        this.message.success('Funcionario excluida com Sucesso!');
        this.adquirirTodos();
      });
  }
}
