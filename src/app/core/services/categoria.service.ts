import { Observable } from 'rxjs';
import { EndpointsConstants } from 'src/app/constants/endpoints.constants';
import { CategoriaDTO } from 'src/app/models/payload/categoria/categoria.dto';
import { CategoriaRetrieveDTO } from 'src/app/models/retrieve/categorias/categoria-retrieve.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  constructor(private http: HttpClient) {}

  adquirirTodas(): Observable<Array<CategoriaRetrieveDTO>> {
    return this.http.get<Array<CategoriaRetrieveDTO>>(
      EndpointsConstants.CATEGORIAS.ADQUIRIR_TODAS
    );
  }

  adquirirPorId(id: number): Observable<Array<CategoriaRetrieveDTO>> {
    const params = new HttpParams().set('codigoCategoria', id.toString());

    return this.http.get<Array<CategoriaRetrieveDTO>>(
      EndpointsConstants.CATEGORIAS.ADQUIRIR_POR_ID,
      { params }
    );
  }

  salvar(categoria: CategoriaDTO): Observable<CategoriaRetrieveDTO> {
    return this.http.post<CategoriaRetrieveDTO>(
      EndpointsConstants.CATEGORIAS.SALVAR,
      categoria
    );
  }

  deletar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      EndpointsConstants.CATEGORIAS.DELETAR + id
    );
  }
}
