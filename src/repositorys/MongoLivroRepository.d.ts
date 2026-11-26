import { type Livro } from "../models/Livro.js";
import type { FiltroLivroDTO, ILivroRepository, LivroDTO } from "./Livrorepository.js";
export declare class MongoLivroRepository implements ILivroRepository {
    listar(): Promise<Livro[]>;
    buscarporId(id: string): Promise<Livro | null>;
    buscarPorId(id: string): Promise<Livro | null>;
    buscarPorFiltro(filtros: FiltroLivroDTO): Promise<Livro[]>;
    cadastrar(dados: LivroDTO): Promise<Livro>;
    atualizar(id: string, dados: LivroDTO): Promise<Livro | null>;
    atualizarParcial(id: string, dados: Partial<LivroDTO>): Promise<Livro | null>;
    deletar(id: string): Promise<boolean>;
    static listar(): Promise<Livro[]>;
    static buscarporId(id: string): Promise<Livro | null>;
    static buscarPorId(id: string): Promise<Livro | null>;
    static buscarPorFiltro(filtros: FiltroLivroDTO): Promise<Livro[]>;
    static cadastrar(dados: LivroDTO): Promise<Livro>;
    static atualizar(id: string, dados: LivroDTO): Promise<Livro | null>;
    static atualizarParcial(id: string, dados: Partial<LivroDTO>): Promise<Livro | null>;
    static deletar(id: string): Promise<boolean>;
}
//# sourceMappingURL=MongoLivroRepository.d.ts.map