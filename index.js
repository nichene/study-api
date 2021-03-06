import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { promises as fs } from "fs";
import swaggerUi from "swagger-ui-express";
import winston from "winston";
import accountsRouter from "./routes/account.routes.js";
import Schema from "./schema/index.js";
import { swaggerDocument } from "./swagger-doc.js";

const { readFile, writeFile } = fs;

global.fileName = "accounts.json";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-bank-api.log" }),
  ],
  format: combine(label({ label: "my-bank-api" }), timestamp(), myFormat),
});

const app = express();

app.use(express.json());

// serving api documentation
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// opening requests from all cross origin resources
app.use(cors());

app.use("/account", accountsRouter);

// this app is serving the same roots also using graphql in the /graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
  })
);

app.listen(3000, async () => {
  setup();
  logger.info("App running on port 3000");
});

async function setup() {
  try {
    await readFile(global.fileName);
  } catch {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    await writeFile(global.fileName, JSON.stringify(initialJson));
  }
}
