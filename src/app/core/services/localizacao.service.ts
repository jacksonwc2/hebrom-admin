import { Observable } from 'rxjs';
import { EndpointsConstants } from 'src/app/constants/endpoints.constants';
import { LocalizacaoDTO } from 'src/app/models/payload/localizacao/localizacao.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalizacaoService {
  constructor(private http: HttpClient) {}

  adquirirTodas(): Observable<Array<LocalizacaoDTO>> {
    return this.http.get<Array<LocalizacaoDTO>>(
      EndpointsConstants.LOCALIZACAO.ADQUIRIR_TODOS
    );
  }

  salvar(localizacaoDTO: LocalizacaoDTO): Observable<LocalizacaoDTO> {
    return this.http.post<LocalizacaoDTO>(
      EndpointsConstants.LOCALIZACAO.SALVAR,
      localizacaoDTO
    );
  }

  deletar(id: number): Observable<LocalizacaoDTO> {
    return this.http.delete<LocalizacaoDTO>(
      EndpointsConstants.LOCALIZACAO.DELETAR + id
    );
  }
}
