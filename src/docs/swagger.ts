Atue como um desenvolvedor backend Node.js/TypeScript.
Gere um arquivo TypeScript que exporta uma constante `swaggerDocument` no padrão
OpenAPI 3.0.0 com a documentação completa das rotas, parâmetros de rota, query
params, requestBody (com exemplos válidos baseados no Zod) e respostas (200, 201,
400, 404, 500) a partir dos arquivos abaixo.
Retorne apenas o código TypeScript válido, sem explicações extras.
import { Router } from "express";

import LivroController from "../src/controlles/livroControles.js";

import { validardados } from "../src/middilewares/dataValidator.js";

import { criarLivroValidator, atualizarLivroValidator } from "../src/middilewares/dataValidator.js";

//inicializar o gerenciador de rotas
const router = Router();

//rotas
router.get("/Livros", LivroController.listar);
router.get("/Livros/buscar", LivroController.buscarPorFiltro);

// - rotas
router.get("/Livros/:id", LivroController.buscarPorId);

// 3 - rotas de escrita
router.get("/", LivroController.listar);
router.get("/:id", LivroController.buscarPorId);
router.post("/livros/:id", validarDados(criarLivroValidator), LivroController.cadastrar);
router.put("/:id", LivroController.atualizar);
router.delete("/:id", LivroController.deletar);

//exportar as rotas
export default router;

import type { Request, Response } from "express";
import mongoose from "mongoose";
import LivroModel from "../models/Livro.js";

async function listar(_req: Request, res: Response): Promise<void> {
  const livros = await LivroModel.find();
  res.status(200).json(livros);
}

async function buscarPorId(
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ mensagem: "ID de livro inválido." });
    return;
  }

  const livro = await LivroModel.findById(id);

  if (!livro) {
    res.status(404).json({ mensagem: "Livro não encontrado!" });
    return;
  }

  res.status(200).json(livro);
}

async function cadastrar(req: Request, res: Response): Promise<void> {
  const livro = await LivroModel.create(req.body);

  res.status(201).json({
    mensagem: "Livro cadastrado com sucesso!",
    livro,
  });
}

async function atualizar(
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ mensagem: "ID de livro inválido." });
    return;
  }

  const livro = await LivroModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!livro) {
    res.status(404).json({ mensagem: "Livro não encontrado!" });
    return;
  }

  res.status(200).json({
    mensagem: "Livro atualizado com sucesso!",
    livro,
  });
}

async function deletar(
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ mensagem: "ID de livro inválido." });
    return;
  }

  const livro = await LivroModel.findByIdAndDelete(id);

  if (!livro) {
    res.status(404).json({ mensagem: "Livro não encontrado!" });
    return;
  }

  res.status(200).json({ mensagem: "Livro removido com sucesso!" });
}

const LivroController = {
  listar,
  buscarPorId,
  cadastrar,
  atualizar,
  deletar,
};

export default LivroController;