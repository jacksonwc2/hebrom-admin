const URL_BASE = 'http://127.0.0.1:8080';

export class EndpointsConstants {
  static readonly AUTENTICACAO = {
    AUTENTICAR: URL_BASE.concat('/'),
  };

  static readonly EVENTOS = {
    ADQUIRIR_TODOS: URL_BASE.concat('/'),
    SALVAR: URL_BASE.concat('/'),
  };

  static readonly ENTENIDADES = {
    ADQUIRIR_TODOS: URL_BASE.concat('/'),
    SALVAR: URL_BASE.concat('/'),
  };

  static readonly CATEGORIAS = {
    ADQUIRIR_TODAS: URL_BASE.concat('/'),
    SALVAR: URL_BASE.concat('/'),
  };

  static readonly LOCALIZACAO = {
    ADQUIRIR_TODOS: URL_BASE.concat('/'),
    SALVAR: URL_BASE.concat('/'),
  };
}