export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Gerenciamento de Livros",
    version: "1.0.0",
    description:
      "Documentação completa da API REST para consulta, cadastro, atualização e remoção de livros.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de Desenvolvimento",
    },
  ],
  tags: [
    {
      name: "Livros",
      description: "Operações relacionadas ao catálogo de livros",
    },
  ],
  paths: {
    "/Livros": {
      get: {
        tags: ["Livros"],
        summary: "Listar todos os livros",
        description: "Retorna a lista completa de livros cadastrados (LivroController.listar).",
        parameters: [
          {
            name: "pagina",
            in: "query",
            required: false,
            description: "Número da página para paginação",
            schema: {
              type: "integer",
              minimum: 1,
              default: 1,
            },
            example: 1,
          },
          {
            name: "limite",
            in: "query",
            required: false,
            description: "Quantidade máxima de registros por página",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 10,
            },
            example: 10,
          },
        ],
        responses: {
          "200": {
            description: "Lista de livros retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Livro",
                  },
                },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequest",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/Livros/buscar": {
      get: {
        tags: ["Livros"],
        summary: "Buscar livros por filtro",
        description:
          "Filtra livros por título, autor ou editora via parâmetros de consulta (LivroController.buscarPorFiltro).",
        parameters: [
          {
            name: "titulo",
            in: "query",
            required: false,
            description: "Título (ou trecho do título) do livro",
            schema: {
              type: "string",
            },
            example: "Dom Casmurro",
          },
          {
            name: "autor",
            in: "query",
            required: false,
            description: "Nome do autor do livro",
            schema: {
              type: "string",
            },
            example: "Machado de Assis",
          },
          {
            name: "editora",
            in: "query",
            required: false,
            description: "Nome da editora",
            schema: {
              type: "string",
            },
            example: "Companhia das Letras",
          },
        ],
        responses: {
          "200": {
            description: "Livros encontrados conforme os filtros informados",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Livro",
                  },
                },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequest",
          },
          "404": {
            $ref: "#/components/responses/NotFound",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/Livros/{id}": {
      get: {
        tags: ["Livros"],
        summary: "Buscar livro por ID",
        description: "Retorna os detalhes de um livro específico pelo seu ID (LivroController.buscarPorId).",
        parameters: [
          {
            $ref: "#/components/parameters/LivroIdParam",
          },
        ],
        responses: {
          "200": {
            description: "Livro encontrado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Livro",
                },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequest",
          },
          "404": {
            $ref: "#/components/responses/NotFound",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/": {
      get: {
        tags: ["Livros"],
        summary: "Listar todos os livros (rota raiz)",
        description: "Rota alternativa na raiz que retorna todos os livros cadastrados (LivroController.listar).",
        parameters: [
          {
            name: "pagina",
            in: "query",
            required: false,
            description: "Número da página para paginação",
            schema: {
              type: "integer",
              minimum: 1,
              default: 1,
            },
            example: 1,
          },
          {
            name: "limite",
            in: "query",
            required: false,
            description: "Quantidade máxima de registros por página",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 10,
            },
            example: 10,
          },
        ],
        responses: {
          "200": {
            description: "Lista de livros retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Livro",
                  },
                },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequest",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/{id}": {
      get: {
        tags: ["Livros"],
        summary: "Buscar livro por ID (rota raiz)",
        description: "Rota alternativa na raiz para buscar um livro pelo seu ID (LivroController.buscarPorId).",
        parameters: [
          {
            $ref: "#/components/parameters/LivroIdParam",
          },
        ],
        responses: {
          "200": {
            description: "Livro encontrado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Livro",
                },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequest",
          },
          "404": {
            $ref: "#/components/responses/NotFound",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
      put: {
        tags: ["Livros"],
        summary: "Atualizar livro",
        responses: {
          "200": {
            description: "Livro atualizado com sucesso",
          },
          "400": {
            description: "Dados inválidos",
          },
          "404": {
            description: "Livro não encontrado",
          },
        },
      },
    },
  },
};