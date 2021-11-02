import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

async function createAccount(req, res, next) {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error("Name and balance are required.");
    }

    const data = JSON.parse(await readFile(global.fileName));

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };

    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);

    logger.info(`POST /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
}

async function getAccounts(_, res, next) {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;

    res.send(data);

    logger.info(`Get /account`);
  } catch (err) {
    next(err);
  }
}

async function getAcountById(req, res, next) {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );

    res.send(account);

    logger.info(`Get /account/:id`);
  } catch (err) {
    next(err);
  }
}

async function deleteAcountById(req, res, next) {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.end();

    logger.info(`Delete /account/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function updateAccount(req, res, next) {
  try {
    let account = req.body;

    if (!account.id || !account.name || account.balance == null) {
      throw new Error("Id, name and balance are required.");
    }

    const data = JSON.parse(await readFile(global.fileName));

    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (index === -1) {
      throw new Error("Account not found.");
    }

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);

    logger.info(`Put /account/:id - ${JSON.stringify(account, null, 2)}`);
  } catch (err) {
    next(err);
  }
}

async function updateBalance(req, res, next) {
  try {
    let account = req.body;

    const data = JSON.parse(await readFile(global.fileName));

    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (!account.id || account.balance == null) {
      throw new Error("Id and balance are required.");
    }

    if (index === -1) {
      throw new Error("Account not found.");
    }

    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data.accounts[index]);

    logger.info(`Put /account/:id - ${JSON.stringify(account, null, 2)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createAccount,
  getAccounts,
  getAcountById,
  deleteAcountById,
  updateAccount,
  updateBalance,
};
