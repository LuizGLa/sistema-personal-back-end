export type ExerciciosTypesToPagination = {
  id: string;
  nome: string;
  descricao: string;
  gifUrl?: string;
}

export type ExercicicosTypes = {
  id: string;
  nome: string;
  descricao: string;
  gifUrl?: string;
}

export type PaginateExercicios = {
  data: ExerciciosTypesToPagination[];
  maxPag: number;
}
