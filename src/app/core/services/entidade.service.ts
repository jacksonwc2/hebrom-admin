import { Observable } from 'rxjs';
import { EndpointsConstants } from 'src/app/constants/endpoints.constants';
import { EntidadeDTO } from 'src/app/models/payload/entidade/entidade.dto';
import { EntidadeRetrieveDTO } from 'src/app/models/retrieve/entidade/entidade-retrieve.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EntidadeService {
  constructor(private http: HttpClient) {}

  adquirirTodos(): Observable<Array<EntidadeRetrieveDTO>> {
    return this.http.get<Array<EntidadeRetrieveDTO>>(
      EndpointsConstants.ENTIDADES.ADQUIRIR_TODOS
    );
  }

  salvar(entidade: EntidadeDTO): Observable<boolean> {
    return this.http.post<boolean>(
      EndpointsConstants.ENTIDADES.SALVAR,
      entidade
    );
  }

  deletar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(EndpointsConstants.ENTIDADES.DELETAR + id);
  }

  adquirirPorId(id: number): Observable<Array<EntidadeRetrieveDTO>> {
    const params = new HttpParams().set('codigoEntidade', id.toString());

    return this.http.get<Array<EntidadeRetrieveDTO>>(
      EndpointsConstants.ENTIDADES.ADQUIRIR_POR_ID,
      { params }
    );
  }
}
