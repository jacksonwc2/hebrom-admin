import { Observable, Observer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  dataFilter = [];

  data = [
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
    'dssgdfgdf',
    'fdgdf',
  ];

  /**
   * Formulario para filtragem do menu
   */
  search: FormGroup;

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.search = this.fb.group({
      search: '',
    });
    this.dataFilter = this.data;
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

  validateForm: FormGroup;

  submitForm(value: { descricao: string }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      descricao: ['', [Validators.required]],
    });
  }
}
