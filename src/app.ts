import express from "express";
import type { Request, Response } from "express";

export interface Livro {
  id: number;
  title: string;
  author: string;
  ano_pub: number;
}

const app = express();

app.use(express.json());

const livros: Livro[] = [
  {
    id: 1,
    title: "Sherlock Holmes: O Mistério",
    author: "Hans Donner",
    ano_pub: 1990,
  },
  {
    id: 2,
    title: "Cidade de Papel",
    author: "Cora Coraline",
    ano_pub: 2016,
  },
];

function buscaLivro(id: string | number): number {
  return livros.findIndex((livro) => livro.id === Number(id));
}

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Codificação BackEnd");
});

app.get("/livros", (_req: Request, res: Response) => {
  res.status(200).json(livros);
});

app.post("/livros", (req: Request, res: Response) => {
  const { id, title, author, ano_pub } = req.body as Partial<Livro>;

  const novoLivro: Livro = {
    id: Number(id),
    title: String(title),
    author: String(author),
    ano_pub: Number(ano_pub),
  };

  livros.push(novoLivro);

  res.status(201).json({
    mensagem: "Livro cadastrado com sucesso!",
    livro: novoLivro,
  });
});

app.put("/livros/:id", (req: Request, res: Response) => {
  const index = buscaLivro(req.params.id);

  if (index === -1) {
    res.status(404).json({ mensagem: "Livro não encontrado!" });
    return;
  }

  const { title, author, ano_pub } = req.body as Partial<Livro>;

  livros[index] = {
    ...livros[index]!,
    title: String(title),
    author: String(author),
    ano_pub: Number(ano_pub),
  };

  res.status(200).json({
    mensagem: "Livro atualizado com sucesso!",
    livro: livros[index],
  });
});

app.delete("/livros/:id", (req: Request, res: Response) => {
  const index = buscaLivro(req.params.id);

  if (index === -1) {
    res.status(404).json({ mensagem: "Livro não encontrado!" });
    return;
  }

  livros.splice(index, 1);

  res.status(200).json({
    mensagem: "Livro removido com sucesso!",
  });
});

export default app;