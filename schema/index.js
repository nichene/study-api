import { GraphQLObjectType, GraphQLSchema } from "graphql";
import AccountMutations from "./mutations/account.mutation.js";
import AccountQueries from "./queries/account.query.js";

const Schema = new GraphQLSchema({
  types: null,
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: { ...AccountQueries },
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutation",
    fields: { ...AccountMutations },
  }),
});

export default Schema;
