import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Criação da função
export function validardados(validador: z.ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const resultado = validador.safeParse(req.body);

        if (!resultado.success) {
            const erroFormatado = resultado.error.issues.map((erro) => ({
                campo: erro.path.join("."),
                mensagem: erro.message,
            }));

            return res.status(400).json({
                mensagem: "Erro de validação dos dados.",
                erros: erroFormatado,
            });
        }

        req.body = resultado.data;
        next();
    };
}

