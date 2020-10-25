const URL_BASE = 'http://127.0.0.1:8080';

export class EndpointsConstants {
  static readonly AUTENTICACAO = {
    AUTENTICAR: URL_BASE.concat('/autenticacao/login'),
  };

  static readonly EVENTOS = {
    ADQUIRIR_TODOS: URL_BASE.concat('/eventoService/adquirTodos'),
    SALVAR: URL_BASE.concat('/eventoService/salvar'),
  };

  static readonly ENTENIDADES = {
    ADQUIRIR_TODOS: URL_BASE.concat('/entidadeService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/entidadeService/salvar'),
  };

  static readonly CATEGORIAS = {
    ADQUIRIR_TODAS: URL_BASE.concat('/categoriaService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/categoriaService/salvar'),
    ADQUIRIR_POR_ID: URL_BASE.concat('/categoriaService/adquirirPorId'),
    DELETAR: URL_BASE.concat('/categoriaService/deletar'),
  };

  static readonly LOCALIZACAO = {
    ADQUIRIR_TODOS: URL_BASE.concat('/localizacaoService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/localizacaoService/salvar'),
  };
}
