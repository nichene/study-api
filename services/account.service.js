import AccountRepository from "../repositories/account.repository.js";

// this file should contain your business logic

async function createAccount(account) {
  return await AccountRepository.insertAccount(account);
}

async function getAccounts() {
  return await AccountRepository.getAccounts();
}

async function getAccountById(id) {
  return await AccountRepository.getAccountById(id);
}

async function deleteAcountById(id) {
  return await AccountRepository.deleteAccountById(id);
}

async function updateAccount(account) {
  return await AccountRepository.updateAccount(account);
}

async function updateBalance(account) {
  const acc = await getAccountById(account.id);

  acc.balance = account.balance;

  return await AccountRepository.updateAccount(acc);
}

export default {
  createAccount,
  getAccounts,
  getAccountById,
  deleteAcountById,
  updateAccount,
  updateBalance,
};
