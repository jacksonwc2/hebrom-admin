import { NzMessageService } from 'ng-zorro-antd';
import { throwError } from 'rxjs';
import { catchError, finalize, take } from 'rxjs/operators';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css'],
})
export class AutenticacaoComponent implements OnInit {
  public autenticacaoForm!: FormGroup;
  public requesting = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private autenticacaoService: AutenticacaoService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.autenticacaoForm = this.fb.group({
      login: [null, [Validators.required]],
      senha: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.autenticacaoForm.controls) {
      this.autenticacaoForm.controls[i].markAsDirty();
      this.autenticacaoForm.controls[i].updateValueAndValidity();
    }
  }

  login(): void {
    this.requesting = true;

    this.autenticacaoService
      .autenticar(this.autenticacaoForm.value)
      .pipe(
        take(1),
        finalize(() => (this.requesting = false)),
        catchError((error) => {
          this.message.error('Dados inválidos!');
          return throwError(error);
        })
      )
      .subscribe((retorno) => {
        if (retorno) {
          this.message.success('Bem Vindo!');
          localStorage.setItem('logado', 'true');
          this.router.navigate(['pages/dashboard']);
        }
      });
  }
}
