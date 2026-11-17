import mongoose, { Schema, type Model } from "mongoose";

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
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    ano_pub: { type: Number, required: true },
    publisher: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    page: { type: Number, required: true, min: 1 },
  },
  { versionKey: false },
);

const LivroModel =
  (mongoose.models.Livro as Model<Livro> | undefined) ??
  mongoose.model<Livro>("Livro", livroSchema);

export default LivroModel;
