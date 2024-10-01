import { mergeTypeDefs } from "@graphql-tools/merge";
import { gql } from "apollo-server-express";
import { userTypeDefs } from "./userTypeDefs";
import { testResultsTypeDefs } from "./testResultTypeDefs";
import { activityLogsTypeDefs } from "./ActivityLogsTypeDefs";
import { insulinLogTypeDefs } from "./InsulinLogTypeDefs";
import { badgesTypeDefs } from "./BadgesTypeDefs";
import { articlesTypeDefs } from "./ArticleTypeDefs";
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
  activityLogsTypeDefs,
  insulinLogTypeDefs,
  badgesTypeDefs,
  articlesTypeDefs
]);
