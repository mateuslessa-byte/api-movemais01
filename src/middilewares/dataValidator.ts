import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const livroSchema = z.object({
    title: z.string().trim().min(1),
    author: z.string().trim().min(1),
    ano_pub: z.coerce.number().int(),
    publisher: z.string().trim().min(1),
    genre: z.string().trim().min(1),
    page: z.coerce.number().int().positive(),
});

export const criarLivroValidator = livroSchema;
export const atualizarLivroValidator = livroSchema.partial();

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
