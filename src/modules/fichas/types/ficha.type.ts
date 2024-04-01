export type FichasTypesToPagination = {
  id: string;
  nome: string;
  id_usuario: string;
}

export type FichasTypes = {
  id: string;
  nome: string;
  id_usuario: string;
}

export type PaginateFichas = {
  data: FichasTypesToPagination[];
  maxPag: number;
}
