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
  readonly ENDERECO = 'Endereço';
  readonly CONTATO = 'Telefone';
  readonly EMAIL = 'Email';
  readonly SALVAR = 'SALVAR';

  readonly EXCECAO_NAO_HA_DADOS = 'Não há Dados.';
  readonly EXCECAO_ENSIRA_NOME = 'Insira o nome.';
  readonly EXCECAO_MINIMO_CARACTERES = 'Insira no mínimo 3 caracteres.';
  readonly EXCECAO_MAXIMO_CARACTERES = 'Insira no máximo 255 caracteres.';

  readonly EXCECAO_INSIRA_RAZAO_SOCIAL = 'Insira a razão social.';

  readonly EXCECAO_ENSIRA_DOCUMENTO = 'Insira o cnpj.';
  readonly EXCECAO_MINIMO_DOCUMENTO = 'Insira no mínimo 14 caracteres.';
  readonly EXCECAO_MAXIMO_DOCUMENTO = 'Insira no máximo 18 caracteres.';

  readonly EXCECAO_ENSIRA_EMAIL = 'Insira o email.';
  readonly EXCECAO_MINIMO_EMAIL = 'Insira no mínimo 14 caracteres.';
  readonly EXCECAO_MAXIMO_EMAIL = 'Insira no máximo 18 caracteres.';

  readonly EXCECAO_ENSIRA_CONTATO = 'Insira o contato.';
  readonly EXCECAO_MINIMO_CONTATO = 'Insira no mínimo 14 caracteres.';
  readonly EXCECAO_MAXIMO_CONTATO = 'Insira no máximo 18 caracteres.';

  readonly EXCECAO_ENSIRA_ENDERECO = 'Insira o endereço.';
  readonly EXCECAO_MINIMO_ENDERECO = 'Insira no mínimo 14 caracteres.';
  readonly EXCECAO_MAXIMO_ENDERECO = 'Insira no máximo 18 caracteres.';

  readonly EXCECAO_ESCOLHA_LOCALIZACAO = 'Escolha uma localização.';

  dataFilter = [];
  data = [];

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
    private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      nomeFantasia: ['', Validators.compose([Validators.required])],
      razaoSocial: ['', Validators.compose([Validators.required])],
      cnpj: ['', Validators.compose([Validators.required])],
      telefone: ['', Validators.compose([Validators.required])],
      endereco: ['', Validators.compose([Validators.required])],
      email: [
        '',
        Validators.compose([Validators.required, Validators.minLength(14)]),
      ],
      id: null,
    });
  }

  ngOnInit(): void {
    this.search = this.fb.group({
      search: '',
    });
    this.dataFilter = this.data;

    this.adquirirTodos();

    this.titleService.atualizar('Entidades');
  }

  private adquirirTodos() {
    this.entidadeService
      .adquirirTodos()
      .pipe(take(1))
      .subscribe((entidades) => {
        const editar = entidades[0] != null;
        this.validateForm.setValue({
          nomeFantasia: editar ? entidades[0].nomeFantasia || '' : '',
          razaoSocial: editar ? entidades[0].razaoSocial || '' : '',
          cnpj: editar ? entidades[0].cnpj || '' : '',
          telefone: editar ? entidades[0].telefone || '' : '',
          endereco: editar ? entidades[0].endereco || '' : '',
          email: editar ? entidades[0].email || '' : '',
          id: editar ? entidades[0].id || null : null,
        });
      });
  }

  handleOk(): void {
    this.entidadeService
      .salvar(this.validateForm.value)
      .pipe(take(1))
      .subscribe((x) => {
        this.message.success('Entidade salva com sucesso!');
        this.adquirirTodos();
      });
  }
}
