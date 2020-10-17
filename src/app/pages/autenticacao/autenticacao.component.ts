import { take } from 'rxjs/operators';
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

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private autenticacaoService: AutenticacaoService
  ) {}

  ngOnInit(): void {
    this.autenticacaoForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
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
    this.autenticacaoService
      .autenticar(this.autenticacaoForm.value)
      .pipe(take(1))
      .subscribe((retorno) => {
        if (retorno) {
          localStorage.setItem('logado', 'true');
          this.router.navigate(['pages/dashboard']);
        }
      });
  }
}
