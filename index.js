import express from "express";
import { promises as fs } from "fs";
import accountsRouter from "./routes/accounts.js";

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, async () => {
  setup();
  console.log("App running on port 3000");
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
