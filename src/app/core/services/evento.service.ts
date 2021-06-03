import { Observable } from 'rxjs';
import { EndpointsConstants } from 'src/app/constants/endpoints.constants';
import { EventoDTO } from 'src/app/models/payload/eventos/eventos.dto';
import { EventoRetrieveDTO } from 'src/app/models/retrieve/eventos/eventos-retrieve.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventoService {
  constructor(private http: HttpClient) {}

  upload(files: Array<any>): Observable<String> {
    const formData = new FormData();

    files.forEach((x) => {
      formData.append('filename', x);
    });

    return this.http.post<any>(EndpointsConstants.FILES.UPLOAD, formData);
  }

  adquirirTodos(): Observable<Array<EventoRetrieveDTO>> {
    return this.http.get<Array<EventoRetrieveDTO>>(
      EndpointsConstants.EVENTOS.ADQUIRIR_TODOS
    );
  }

  salvar(evento: EventoDTO): Observable<boolean> {
    return this.http.post<boolean>(EndpointsConstants.EVENTOS.SALVAR, evento);
  }

  deletar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(EndpointsConstants.EVENTOS.DELETAR + id);
  }

  adquirirPorId(id: number): Observable<Array<EventoRetrieveDTO>> {
    const params = new HttpParams().set('codigoEvento', id.toString());

    return this.http.get<Array<EventoRetrieveDTO>>(
      EndpointsConstants.EVENTOS.ADQUIRIR_POR_ID,
      { params }
    );
  }
}
