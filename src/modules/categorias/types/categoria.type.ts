export type CategoriasTypesToPagination = {
  id: string;
  nome: string;
  id_categoria: string;
  id_usuario: string;
}

export type CategoriasTypes = {
  id: string;
  nome: string;
  id_categoria: string;
  id_usuario: string;
}

export type PaginateFichas = {
  data: CategoriasTypesToPagination[];
  maxPag: number;
}
