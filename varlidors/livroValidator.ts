import { z } from "zod";

//criar as regras para cadastro (post)
export const criarLivroValidator = z.object({
    title: z.string().trim().min(3, "o titulo deve ter pelo menos 3 caracteres."),
    author: z.string().trim().min(3, "o author deve ter pelo menos 3 caracteres"),
    ano_pub: z.coerce.number()
        .int("o ano de publicacao deve ser um numero inteiro")
        .min(1, "o ano de publicacao deve ser valido")
        .max(new Date().getFullYear(), "o ano de publicacao nao pode ser futuro"),
    publisher: z.string().trim().min(3, " a editora deve ter pelo menos 3 caracteres"),
    genre: z.string().trim().min(3, " o genero deve ter pelo menos 3 caracteres"),
    pages: z.coerce.number()
        .int("o numero de paginas deve ser inteiro")
        .positive("o livro deve ter pelo menos 1 pagina"),
    cover: z.union([
        z.string().url("a capa deve ser uma url valida."),
        z.literal(""),
    ])
        .optional()
        .transform((valor) => valor === "" ? undefined : valor),
});

export const atualizarLivroValidator = criarLivroValidator.partial();