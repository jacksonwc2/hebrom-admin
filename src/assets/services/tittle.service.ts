import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TitleService {
  private titulo = new BehaviorSubject<string>(null);

  atualizar(titulo: string) {
    this.titulo.next(titulo);
  }

  observable() {
    return this.titulo.asObservable();
  }

  limpar() {
    this.titulo.next(null);
  }

  get tituloInformado(): string {
    return this.titulo.value;
  }
}
