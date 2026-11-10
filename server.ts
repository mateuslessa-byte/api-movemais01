import "dotenv/config";
import process from "node:process";
import conectaAoBancoDeDados from "./src/config/dbConnect.js";
import app from "./src/app.js";

async function iniciaServidor(): Promise<void> {
  try {
    const conexao = await conectaAoBancoDeDados();
    conexao.on("error", (erro: Error) => {
      console.error("Erro durante a conexão com o banco de dados:", erro);
    });

    console.log("Conexão com o banco de dados realizada com sucesso!");

    const porta = process.env.PORT || 3000;
    app.listen(porta, () => {
      console.log(`Servidor em execução na porta ${porta}...`);
    });
  } catch (erro) {
    console.error("Falha ao conectar ao banco de dados:", erro);
    process.exit(1);
  }
}

void iniciaServidor();
