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
