import type { Request, Response } from "express";
import mongoose from "mongoose";
import LivroModel from "../models/Livro.js";

async function listar(_req: Request, res: Response): Promise<void> {
  const livros = await LivroModel.find();
  res.status(200).json(livros);
}

async function buscarPorFiltro(
  req: Request<
    Record<string, never>,
    unknown,
    unknown,
    { titulo?: string; autor?: string; editora?: string }
  >,
  res: Response,
): Promise<void> {
  const filtros = [
    ["title", req.query.titulo],
    ["author", req.query.autor],
    ["publisher", req.query.editora],
  ] as const;
  const consulta = Object.fromEntries(
    filtros
      .filter(([, valor]) => valor)
      .map(([campo, valor]) => [
        campo,
        new RegExp(valor!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      ]),
  );
  const livros = await LivroModel.find(consulta);
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
  buscarPorFiltro,
  buscarPorId,
  cadastrar,
  atualizar,
  deletar,
};

export default LivroController;
