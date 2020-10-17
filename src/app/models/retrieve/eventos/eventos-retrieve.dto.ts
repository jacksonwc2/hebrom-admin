import { CategoriaDTO } from 'src/app/models/payload/categoria/categoria.dto';
import { EntidadeDTO } from 'src/app/models/payload/entidade/entidade.dto';

export interface EventoRetrieveDTO {
  titulo: string;
  descricao: string;
  entidade: EntidadeDTO;
  categoria: CategoriaDTO;
  localizacao: string;
  dataInicio: Date;
  dataFinal: Date;
  banner: string;
}
