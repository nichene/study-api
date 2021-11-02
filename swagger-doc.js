export const swaggerDocument = {
  swagger: "2.0",
  info: {
    description: "Example API",
    version: "1.0.0",
    title: "Example API ",
  },
  host: "localhost:3000",
  tags: [
    {
      name: "account",
      description: "Account management",
    },
  ],
  paths: {
    "/account": {
      get: {
        tags: ["account"],
        summary: "Get existing accounts",
        description: "Get existing accounts",
        produces: ["application/json"],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/Account",
              },
            },
          },
          400: {
            description: "Error ocurred",
          },
        },
      },
      post: {
        tags: ["account"],
        summary: "Create new account",
        description: "Create new account",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Account object",
            required: true,
            schema: {
              $ref: "#/definitions/Account",
            },
          },
        ],
        responses: {
          200: {
            description: "Account created",
          },
          400: {
            description: "Error ocurred",
          },
        },
      },
    },
  },
  definitions: {
    Account: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "Ni",
        },
        balance: {
          type: "integer",
          format: "int64",
          example: 10000,
        },
      },
    },
  },
};
