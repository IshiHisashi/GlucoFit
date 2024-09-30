import { mergeTypeDefs } from "@graphql-tools/merge";
import { gql } from "apollo-server-express";
import { userTypeDefs } from "./userTypeDefs";
import { testResultsTypeDefs } from "./testResultTypeDefs";
// Import more typeDefs as needed...

const rootTypeDefs = gql`
  scalar Date
  scalar JSON

  type Query
  type Mutation
`;

export const typeDefs = mergeTypeDefs([
  rootTypeDefs,
  userTypeDefs,
  testResultsTypeDefs,
  // Add more schema files here...
]);
