import { Observable } from 'rxjs';
import { EndpointsConstants } from 'src/app/constants/endpoints.constants';
import { AutenticacaoDTO } from 'src/app/models/payload/autenticacao/autenticacao.dto';
import { AutenticacaoRetrieveDTO } from 'src/app/models/retrieve/autenticacao/autenticacao-retrieve.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AutenticacaoService {
  constructor(private http: HttpClient) {}

  autenticar(
    autenticacao: AutenticacaoDTO
  ): Observable<AutenticacaoRetrieveDTO> {
    return this.http.post<AutenticacaoRetrieveDTO>(
      EndpointsConstants.AUTENTICACAO.AUTENTICAR,
      autenticacao
    );
  }
}
