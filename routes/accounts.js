import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

global.fileName = "accounts.json";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let account = req.body;

    const data = JSON.parse(await readFile(global.fileName));

    account = {
      id: data.nextId++,
      ...account,
    };

    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (_, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;

    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );

    res.send(account);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.end();
  } catch (err) {
    next(err);
  }
});

// full update of a resource
router.put("/", async (req, res, next) => {
  try {
    let account = req.body;

    const data = JSON.parse(await readFile(global.fileName));

    const index = data.accounts.findIndex((a) => a.id === account.id);
    data.accounts[index] = account;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (err) {
    next(err);
  }
});

// partial update of resource
router.patch("/updateBalance", async (req, res, next) => {
  try {
    let account = req.body;

    const data = JSON.parse(await readFile(global.fileName));

    const index = data.accounts.findIndex((a) => a.id === account.id);
    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data.accounts[index]);
  } catch (err) {
    next(err);
  }
});

// will run for all endpoints above it
router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default router;
