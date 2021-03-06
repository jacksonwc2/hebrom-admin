const URL_BASE = 'http://18.116.72.213:8081';

export class EndpointsConstants {
  static readonly AUTENTICACAO = {
    AUTENTICAR: URL_BASE.concat('/autenticacao/login'),
  };

  static readonly FILES = {
    UPLOAD: URL_BASE.concat('/fileService/upload'),
    FILE: URL_BASE.concat('/fileService/files/'),
  };

  static readonly EVENTOS = {
    ADQUIRIR_TODOS: URL_BASE.concat('/eventoService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/eventoService/salvar'),
    ADQUIRIR_POR_ID: URL_BASE.concat('/eventoService/adquirirPorId'),
    DELETAR: URL_BASE.concat('/eventoService/deletar/'),
  };

  static readonly ENTIDADES = {
    ADQUIRIR_TODOS: URL_BASE.concat('/entidadeService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/entidadeService/salvar'),
    ADQUIRIR_POR_ID: URL_BASE.concat('/entidadeService/adquirirPorId'),
    DELETAR: URL_BASE.concat('/entidadeService/deletar/'),
  };

  static readonly CATEGORIAS = {
    ADQUIRIR_TODAS: URL_BASE.concat('/categoriaService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/categoriaService/salvar'),
    ADQUIRIR_POR_ID: URL_BASE.concat('/categoriaService/adquirirPorId'),
    DELETAR: URL_BASE.concat('/categoriaService/deletar/'),
  };

  static readonly LOCALIZACAO = {
    ADQUIRIR_TODOS: URL_BASE.concat('/localizacaoService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/localizacaoService/salvar'),
    DELETAR: URL_BASE.concat('/localizacaoService/deletar/'),
  };
}
