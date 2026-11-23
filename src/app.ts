import express from "express";
import type { Request, Response } from "express";
import livroRoutes from "../routes/LivroRoutes.js";
import { swaggerDocument } from "./docs/swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());
app.set("json spaces", 2);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Codificação BackEnd");
});

app.use("/livros", livroRoutes);

export default app;
