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
