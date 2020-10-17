import { Observable } from 'rxjs';
import { EndpointsConstants } from 'src/app/constants/endpoints.constants';
import { EventoDTO } from 'src/app/models/payload/eventos/eventos.dto';
import { EventoRetrieveDTO } from 'src/app/models/retrieve/eventos/eventos-retrieve.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventoService {
  constructor(private http: HttpClient) {}

  adquirirTodos(): Observable<Array<EventoRetrieveDTO>> {
    return this.http.get<Array<EventoRetrieveDTO>>(
      EndpointsConstants.EVENTOS.ADQUIRIR_TODOS
    );
  }

  salvar(evento: EventoDTO): Observable<boolean> {
    return this.http.post<boolean>(EndpointsConstants.EVENTOS.SALVAR, evento);
  }
}
