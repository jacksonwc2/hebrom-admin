import { Observable } from 'rxjs';
import { EndpointsConstants } from 'src/app/constants/endpoints.constants';
import { AcervoDTO } from 'src/app/models/payload/acervo/acervo.dto';
import { AcervoRetrieveDTO } from 'src/app/models/retrieve/acervo/acervo-retrieve.dto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AcervoService {
  constructor(private http: HttpClient) {}

  adquirirTodos(): Observable<Array<AcervoRetrieveDTO>> {
    return this.http.get<Array<AcervoRetrieveDTO>>(
      EndpointsConstants.ACERVO.ADQUIRIR_TODOS
    );
  }

  salvar(entidade: AcervoDTO): Observable<boolean> {
    return this.http.post<boolean>(EndpointsConstants.ACERVO.SALVAR, entidade);
  }

  deletar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(EndpointsConstants.ACERVO.DELETAR + id);
  }

  adquirirPorId(id: number): Observable<Array<AcervoRetrieveDTO>> {
    const params = new HttpParams().set('codigoAcervo', id.toString());

    return this.http.get<Array<AcervoRetrieveDTO>>(
      EndpointsConstants.ACERVO.ADQUIRIR_POR_ID,
      { params }
    );
  }

  upload(files): Observable<Array<string>> {
    // Permitir content-type indefinido para o navegador definir corretamente
    const headers = new HttpHeaders().set('Content-Type', '');

    const formData = new FormData();
    debugger;
    files.forEach((x) => {
      formData.append('filename', x);
    });

    return this.http.post<Array<string>>(
      EndpointsConstants.ACERVO.UPLOAD,
      formData,
      { headers }
    );
  }
}
