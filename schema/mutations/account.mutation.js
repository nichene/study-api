import { GraphQLBoolean, GraphQLInt } from "graphql";
import AccountResolver from "../resolvers/account.resolver.js";
import Account from "../types/account.js";
import AccountInput from "../types/accountInput.js";

const accountMutations = {
  createAccount: {
    type: Account,
    args: {
      account: {
        name: "account",
        type: AccountInput,
      },
    },
    resolve(_, args) {
      return AccountResolver.createAccount(args.account);
    },
  },
  deleteAccountById: {
    type: GraphQLBoolean,
    args: {
      id: {
        name: "id",
        type: GraphQLInt,
      },
    },
    resolve(_, args) {
      AccountResolver.deleteAccountById(args.id);
    },
  },
  updateAccount: {
    type: Account,
    args: {
      account: {
        name: "account",
        type: AccountInput,
      },
    },
    resolve(_, args) {
      return AccountResolver.updateAccount(args.account);
    },
  },
};

export default accountMutations;
