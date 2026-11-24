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