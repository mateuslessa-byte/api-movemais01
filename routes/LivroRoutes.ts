import { Router } from "express";
import LivroController from "../src/controlles/livroControles.js";

const router = Router();

router.get("/", LivroController.listar);
router.get("/:id", LivroController.buscarPorId);
router.post("/", LivroController.cadastrar);
router.put("/:id", LivroController.atualizar);
router.delete("/:id", LivroController.deletar);

export default router;
