import mongoose, { Schema } from "mongoose";

export interface Livro {
  title: string;
  author: string;
  ano_pub: number;
  publisher: string;
  genre: string;
  page: number;
}

const livroSchema = new Schema<Livro>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    ano_pub: { type: Number, required: true },
    publisher: { type: String, required: true },
    genre: { type: String, required: true },
    page: { type: Number, required: true },
  },
  { versionKey: false },
);

const LivroModel = mongoose.model<Livro>("Livro", livroSchema);

export default LivroModel;
