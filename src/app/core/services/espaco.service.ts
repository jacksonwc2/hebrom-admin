import { Observable } from 'rxjs';
import { EndpointsConstants } from 'src/app/constants/endpoints.constants';
import { EspacoDTO } from 'src/app/models/payload/espaco/espaco.dto';
import { EspacoRetrieveDTO } from 'src/app/models/retrieve/espaco/espaco-retrieve.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EspacoService {
  constructor(private http: HttpClient) {}

  adquirirTodos(): Observable<Array<EspacoRetrieveDTO>> {
    return this.http.get<Array<EspacoRetrieveDTO>>(
      EndpointsConstants.ESPACO.ADQUIRIR_TODOS
    );
  }

  adquirirPorId(id: number): Observable<Array<EspacoRetrieveDTO>> {
    const params = new HttpParams().set('codigoEspaco', id.toString());

    return this.http.get<Array<EspacoRetrieveDTO>>(
      EndpointsConstants.ESPACO.ADQUIRIR_POR_ID,
      { params }
    );
  }

  salvar(categoria: EspacoDTO): Observable<EspacoRetrieveDTO> {
    return this.http.post<EspacoRetrieveDTO>(
      EndpointsConstants.ESPACO.SALVAR,
      categoria
    );
  }

  deletar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(EndpointsConstants.ESPACO.DELETAR + id);
  }
}
