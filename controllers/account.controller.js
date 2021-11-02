import AccountService from "../services/account.service.js";

async function createAccount(req, res, next) {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error("Name and balance are required.");
    }

    account = await AccountService.createAccount(account);

    res.send(account);

    logger.info(`POST /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
}

async function getAccounts(_, res, next) {
  try {
    res.send(await AccountService.getAccounts());

    logger.info(`Get /account`);
  } catch (err) {
    next(err);
  }
}

async function getAcountById(req, res, next) {
  try {
    res.send(await AccountService.getAccountById(req.params.id));

    logger.info(`Get /account/:id`);
  } catch (err) {
    next(err);
  }
}

async function deleteAccountById(req, res, next) {
  try {
    await AccountService.deleteAcountById(req.params.id);

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

    res.send(await AccountService.updateAccount(account));

    logger.info(`Put /account/:id - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
}

async function updateBalance(req, res, next) {
  try {
    let account = req.body;

    if (!account.id || account.balance == null) {
      throw new Error("Id and balance are required.");
    }

    res.send(await AccountService.updateBalance(account));

    logger.info(`Put /account/:id - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createAccount,
  getAccounts,
  getAcountById,
  deleteAccountById,
  updateAccount,
  updateBalance,
};
