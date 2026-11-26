import type { Livro } from "../models/Livro.js";

export interface LivroDTO {
  title: string;
  author: string;
  ano_pub: number;
  publisher: string;
  genre: string;
  page: number;
}

export interface FiltroLivroDTO {
  editora?: string;
  genero?: string;
  autor?: string;
  titulo?: string;
}

export interface ILivroRepository {
  listar(): Promise<Livro[]>;
  buscarporId(id: string): Promise<Livro | null>;
  buscarPorFiltro(filtros: FiltroLivroDTO): Promise<Livro[]>;
  cadastrar(dados: LivroDTO): Promise<Livro>;
  atualizar(id: string, dados: LivroDTO): Promise<Livro | null>;
  atualizarParcial(
    id: string,
    dados: Partial<LivroDTO>,
  ): Promise<Livro | null>;
  deletar(id: string): Promise<boolean>;
}
