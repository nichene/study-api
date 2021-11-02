import cors from "cors";
import express from "express";
import { promises as fs } from "fs";
import winston from "winston";
import accountsRouter from "./routes/accounts.js";

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

// opening requests from all cross origin resources
app.use(cors());

app.use("/account", accountsRouter);

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
