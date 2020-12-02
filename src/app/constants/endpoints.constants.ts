const URL_BASE = 'http://127.0.0.1:8080';

export class EndpointsConstants {
  static readonly AUTENTICACAO = {
    AUTENTICAR: URL_BASE.concat('/autenticacao/login'),
  };

  static readonly EVENTOS = {
    ADQUIRIR_TODOS: URL_BASE.concat('/eventoService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/eventoService/salvar'),
    ADQUIRIR_POR_ID: URL_BASE.concat('/eventoService/adquirirPorId'),
    DELETAR: URL_BASE.concat('/eventoService/deletar/'),
  };

  static readonly VISITANTE = {
    SALVAR: URL_BASE.concat('/visitanteService/salvar'),
  };

  static readonly ENTIDADES = {
    ADQUIRIR_TODOS: URL_BASE.concat('/entidadeService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/entidadeService/salvar'),
    ADQUIRIR_POR_ID: URL_BASE.concat('/entidadeService/adquirirPorId'),
    DELETAR: URL_BASE.concat('/entidadeService/deletar/'),
  };

  static readonly ACERVO = {
    ADQUIRIR_TODOS: URL_BASE.concat('/acervoService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/acervoService/salvar'),
    ADQUIRIR_POR_ID: URL_BASE.concat('/acervoService/adquirirPorId'),
    DELETAR: URL_BASE.concat('/acervoService/deletar/'),
    UPLOAD: URL_BASE.concat('/fileService/upload/'),
  };

  static readonly CATEGORIAS = {
    ADQUIRIR_TODAS: URL_BASE.concat('/categoriaService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/categoriaService/salvar'),
    ADQUIRIR_POR_ID: URL_BASE.concat('/categoriaService/adquirirPorId'),
    DELETAR: URL_BASE.concat('/categoriaService/deletar/'),
  };

  static readonly ESPACO = {
    ADQUIRIR_TODOS: URL_BASE.concat('/espacoService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/espacoService/salvar'),
    ADQUIRIR_POR_ID: URL_BASE.concat('/espacoService/adquirirPorId'),
    DELETAR: URL_BASE.concat('/espacoService/deletar/'),
  };

  static readonly CADASTRO_FUNCIONARIO = {
    ADQUIRIR_TODOS: URL_BASE.concat('/usuarioService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/usuarioService/salvar'),
    ADQUIRIR_POR_ID: URL_BASE.concat('/usuarioService/adquirirPorId'),
    DELETAR: URL_BASE.concat('/usuarioService/deletar/'),
  };

  static readonly LOCALIZACAO = {
    ADQUIRIR_TODOS: URL_BASE.concat('/espacoService/adquirirTodos'),
    SALVAR: URL_BASE.concat('/espacoService/salvar'),
    ADQUIRIR_POR_ID: URL_BASE.concat('/espacoService/adquirirPorId'),
    DELETAR: URL_BASE.concat('/espacoService/deletar/'),
  };
}
