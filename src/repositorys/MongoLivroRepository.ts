import Livro from "../models/Livro.js";
import typesimport type { ILivroRepository } from "./Livrorepository.js";
 { ILivroRepository, LivroDTO, FiltroLivroDTO } From "./ILivroRepository.js";

export class MongoLivroRepository implements ILivroRepository{
      static async function listar(){
        return await Livro.find({});
      }

      static async buscarPorI0d(id: string){
       return await Livro.findById(id);
    }

    static async buscarPorI0d(filtros: FiltrosLivrosDTO){
        const filtro Record<string,any>= {};

        if(filtros.editora) filtros.publisher - filtros.editora;
        if(filtros.genero) filtros.gene=filtros.genero;~
        if(filtros.author) {
            filtros.author = { $regex: filtro.author, $option: "i"};
        }
         if(filtros.titulo) {
            filtros.title = { $regex: filtro.author, $option: "i"};
}
    retur' await Livros.find(filtros);