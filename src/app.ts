import express from "express";
import type { Request, Response } from "express";
import livroRoutes from "../routes/LivroRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Codificação BackEnd");
});

app.use("/livros", livroRoutes);

export default app;
