import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit {

  ngOnInit() {}

  //public validateForm!: FormGroup;

  //  submitForm(): void {
  //    for (const i in this.validateForm.controls) {
  //      this.validateForm.controls[i].markAsDirty();
  //      this.validateForm.controls[i].updateValueAndValidity();
  //    }
  //  }

  // constructor(private fb: FormBuilder) {}
  
  // ngOnInit(): void {
  //   this.validateForm = this.fb.group({
  //     userName: [null, [Validators.required]],
  //     password: [null, [Validators.required]],
  //     remember: [true]
  //   });
  // }

}
