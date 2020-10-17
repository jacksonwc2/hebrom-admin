import { CategoriaDTO } from 'src/app/models/payload/categoria/categoria.dto';
import { EntidadeDTO } from 'src/app/models/payload/entidade/entidade.dto';

export interface EventoDTO {
  titulo: string;
  descricao: string;
  codigoEntidade: number;
  codigoCategoria: number;
  localizacao: string;
  dataInicio: Date;
  dataFinal: Date;
  banner: string;
}
