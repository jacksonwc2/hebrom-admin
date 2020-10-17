import { Observable } from 'rxjs';
import { EndpointsConstants } from 'src/app/constants/endpoints.constants';
import { EntidadeDTO } from 'src/app/models/payload/entidade/entidade.dto';
import { EntidadeRetrieveDTO } from 'src/app/models/retrieve/entidade/entidade-retrieve.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EntidadeService {
  constructor(private http: HttpClient) {}

  adquirirTodos(): Observable<Array<EntidadeRetrieveDTO>> {
    return this.http.get<Array<EntidadeRetrieveDTO>>(
      EndpointsConstants.ENTENIDADES.ADQUIRIR_TODOS
    );
  }

  salvar(entidade: EntidadeDTO): Observable<boolean> {
    return this.http.post<boolean>(
      EndpointsConstants.ENTENIDADES.SALVAR,
      entidade
    );
  }
}
