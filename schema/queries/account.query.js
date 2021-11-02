import { GraphQLInt, GraphQLList } from "graphql";
import AccountResolver from "../resolvers/account.resolver.js";
import Account from "../types/account.js";

const accountQueries = {
  getAccounts: {
    type: new GraphQLList(Account),
    resolve: () => AccountResolver.getAccounts(),
  },
  getAccountById: {
    type: Account,
    args: {
      id: {
        name: "id",
        type: GraphQLInt,
      },
    },
    resolve: (_, args) => AccountResolver.getAccountById(args.id),
  },
};

export default accountQueries;
