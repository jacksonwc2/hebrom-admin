import { Observable } from 'rxjs';
import { EndpointsConstants } from 'src/app/constants/endpoints.constants';
import { CadastroFuncionarioDTO } from 'src/app/models/payload/cadastro-funcionario/cadastro-funcionario.dto';
import { CadastroFuncionarioRetrieveDTO } from 'src/app/models/retrieve/cadastro-funcionario/cadastro-funcionario-retrieve.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CadastroFuncionarioService {
  constructor(private http: HttpClient) {}

  adquirirTodos(): Observable<Array<CadastroFuncionarioRetrieveDTO>> {
    return this.http.get<Array<CadastroFuncionarioRetrieveDTO>>(
      EndpointsConstants.CADASTRO_FUNCIONARIO.ADQUIRIR_TODOS
    );
  }

  adquirirPorId(id: number): Observable<Array<CadastroFuncionarioRetrieveDTO>> {
    const params = new HttpParams().set('codigoEspaco', id.toString());

    return this.http.get<Array<CadastroFuncionarioRetrieveDTO>>(
      EndpointsConstants.CADASTRO_FUNCIONARIO.ADQUIRIR_POR_ID,
      { params }
    );
  }

  salvar(
    categoria: CadastroFuncionarioDTO
  ): Observable<CadastroFuncionarioRetrieveDTO> {
    return this.http.post<CadastroFuncionarioRetrieveDTO>(
      EndpointsConstants.CADASTRO_FUNCIONARIO.SALVAR,
      categoria
    );
  }

  deletar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      EndpointsConstants.CADASTRO_FUNCIONARIO.DELETAR + id
    );
  }
}
