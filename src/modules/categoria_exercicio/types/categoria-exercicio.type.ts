export type CategoriasExerciciosTypesToPagination = {
  id: string;
  id_categoria: string;
  id_exercicio: string;
  series: number;
  repeticoes: number;
}

export type FichasTypes = {
  id: string;
  id_categoria: string;
  id_exercicio: string;
  series: number;
  repeticoes: number;
}

export type PaginateFichas = {
  data: CategoriasExerciciosTypesToPagination[];
  maxPag: number;
}
