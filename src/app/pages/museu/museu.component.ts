import { NzMessageService } from 'ng-zorro-antd';
import { take } from 'rxjs/operators';
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

  readonly NOME = 'Nome';
  readonly IDADE = 'Idade';
  readonly TELEFONE = 'Telefone';
  readonly EMAIL = 'Email';

  isVisible = false;

  flagVisitanteInformado = false;

  constructor(
    private fb: FormBuilder,
    private visitanteService: VisitanteService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nome: [null, [Validators.required]],
      idade: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      id: null,
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
}
