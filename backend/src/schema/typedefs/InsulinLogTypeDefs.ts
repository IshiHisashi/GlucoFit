import { gql } from "apollo-server-express";

export const insulinLogTypeDefs = gql`
  type InsulinLog {
    id: ID!
    user_id: User!  # Linked to User
    amount: Float!
    injection_time: Date!
  }

  extend type Query {
    getInsulinLog(id: ID!): InsulinLog
    getInsulinLogs: [InsulinLog!]!
    getInsulinLogsByUser(user_id: ID!): [InsulinLog!]!
  }

  extend type Mutation {
    createInsulinLog(
      user_id: ID!
      amount: Float!
      injection_time: Date!
    ): InsulinLog!

    updateInsulinLog(
      id: ID!
      amount: Float
      injection_time: Date
    ): InsulinLog!

    deleteInsulinLog(id: ID!): String!
  }
`;
