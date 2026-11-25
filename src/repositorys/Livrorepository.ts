import type { promises } from "dns";
import type { Livro } from "../models/Livro.js";

export interface LivroDTO {
    id?: string;
    title: string;
    author: string;
    ano__pub: number;
    publisher: string;
    genre: string;
    pages: number
    cover?: string | undefined;  
}

export interface FiltroLivroDTO{
    editora?: string;
    genero?: string;
    author?: string;
    titulo?: string;

}
export interface ILivroRepository{
    listar(): Promise<any[]>;
    buscarporId(id: string): Promise<any[] | null>;
    buscarPorFiltro(filtros: FiltroLivroDTO): Promise<any[]>;
    cadastrar(dados: LivroDTO): Promise<any[]>;
    atualizar(id: string,dados: LivroDTO): Promise<any[]>;
    atualizarParcial(id: string, dados:Partial<LivroDTO>): Promise<any[]; | null>;
    deletar(id: string): Promise<boolean>;
}