import { NzMessageService } from 'ng-zorro-antd';
import { take } from 'rxjs/operators';
import { AcervoService } from 'src/app/core/services/acervo.service';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { EspacoService } from 'src/app/core/services/espaco.service';
import { VisitanteService } from 'src/app/core/services/visitante.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-museu',
  templateUrl: './museu.component.html',
  styleUrls: ['./museu.component.css'],
})
export class MuseuComponent implements OnInit {
  public validateForm!: FormGroup;
  public filtroForm!: FormGroup;
  public itemForm!: FormGroup;

  readonly NOME = 'Nome';
  readonly IDADE = 'Idade';
  readonly TELEFONE = 'Telefone';
  readonly EMAIL = 'Email';
  readonly DESCRICAO = 'Descrição';
  readonly CATEGORIA = 'Categoria';
  readonly ESPACO = 'Espaço';
  readonly ATIVO = 'Ativo';
  readonly STATUS = 'Status';
  readonly DATA = 'Data Cadastro';

  espacos = [];
  categorias = [];

  isVisible = false;

  isVisible2 = false;

  flagVisitanteInformado = false;

  pesquisando = false;
  items = [];

  constructor(
    private fb: FormBuilder,
    private visitanteService: VisitanteService,
    private acervoService: AcervoService,
    private message: NzMessageService,
    private categoriaService: CategoriaService,
    private espacoService: EspacoService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nome: [null, [Validators.required]],
      idade: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });

    this.filtroForm = this.fb.group({
      codigoCategoria: [null, [Validators.required]],
      codigoEspaco: [null, [Validators.required]],
      nome: [null, [Validators.required]],
    });

    this.itemForm = this.fb.group({
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
      codigoAcervoStatus: ['', Validators.compose([Validators.required])],
      dataCadastro: ['', Validators.compose([Validators.required])],
      id: null,
    });

    this.pesquisar();
  }

  pesquisar() {
    this.pesquisando = true;

    this.acervoService
      .adquirirTodos()
      .pipe(take(1))
      .subscribe((x) => {
        this.pesquisando = false;
        this.items = x;
      });

    this.categoriaService
      .adquirirTodas()
      .pipe(take(1))
      .subscribe((retorno) => {
        this.categorias = retorno;
      });

    this.espacoService
      .adquirirTodos()
      .pipe(take(1))
      .subscribe((retorno) => {
        this.espacos = retorno;
      });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.visitanteService
      .salvar(this.validateForm.value)
      .pipe(take(1))
      .subscribe((x) => {
        this.message.success('Entrada registrada com sucesso!');

        this.flagVisitanteInformado = true;

        this.isVisible = false;
      });
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  submitForm(value: { descricao: string }): void {
    for (const key of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  submitFormItem(value: { descricao: string }): void {
    for (const key of Object.keys(this.itemForm.controls)) {
      this.itemForm.controls[key].markAsDirty();
      this.itemForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  submitFormFiltro(value: { descricao: string }): void {
    for (const key of Object.keys(this.filtroForm.controls)) {
      this.filtroForm.controls[key].markAsDirty();
      this.filtroForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  showModalItem(item): void {
    this.isVisible2 = true;
    this.itemForm.setValue({
      nome: item.nome,
      descricao: item.descricao,
      codigoCategoria: item.codigoCategoria,
      codigoEspaco: item.codigoEspaco,
      codigoAcervoStatus: item.codigoAcervoStatus,
      dataCadastro: item.dataCadastro,
      id: item.id,
    });
  }

  handleOkItem(): void {
    this.isVisible2 = false;
  }

  fazerPesquisa() {
    this.acervoService
      .adquirirTodos(
        this.filtroForm.get('codigoCategoria').value,
        this.filtroForm.get('codigoEsoaco').value,
        this.filtroForm.get('nome').value
      )
      .pipe(take(1))
      .subscribe((x) => {
        this.pesquisando = false;
        this.items = x;
      });
  }
}
