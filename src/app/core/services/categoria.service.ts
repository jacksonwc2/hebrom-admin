import { Observable } from 'rxjs';
import { EndpointsConstants } from 'src/app/constants/endpoints.constants';
import { EntidadeDTO } from 'src/app/models/payload/entidade/entidade.dto';
import { CategoriaRetrieveDTO } from 'src/app/models/retrieve/categorias/categoria-retrieve.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  constructor(private http: HttpClient) {}

  adquirirTodas(): Observable<Array<CategoriaRetrieveDTO>> {
    return this.http.get<Array<CategoriaRetrieveDTO>>(
      EndpointsConstants.CATEGORIAS.ADQUIRIR_TODAS
    );
  }

  salvar(entidade: EntidadeDTO): Observable<boolean> {
    return this.http.post<boolean>(
      EndpointsConstants.CATEGORIAS.SALVAR,
      entidade
    );
  }
}
