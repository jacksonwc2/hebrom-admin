import { Observable } from 'rxjs';
import { EndpointsConstants } from 'src/app/constants/endpoints.constants';
import { VisitanteDTO } from 'src/app/models/payload/visitante/visitante.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VisitanteService {
  constructor(private http: HttpClient) {}

  salvar(visanteDTO: VisitanteDTO): Observable<void> {
    return this.http.post<void>(
      EndpointsConstants.VISITANTE.SALVAR,
      visanteDTO
    );
  }

  adquirirTodos(): Observable<any> {
    return this.http.get<any>(EndpointsConstants.VISITANTE.ADQUIRIR_TODOS);
  }
}
