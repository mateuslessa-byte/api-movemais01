import mongoose from "mongoose";

export default async function conectaAoBancoDeDados(): Promise<
  typeof mongoose.connection
> {
  const dbURI = process.env.DB_CONNECTION_STRING;

  if (!dbURI) {
    throw new Error("DB_CONNECTION_STRING não definida.");
  }

  await mongoose.connect(dbURI);
  return mongoose.connection;
}
