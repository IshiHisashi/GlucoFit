import { gql } from "apollo-server-express";

export const dietLogsTypeDefs = gql`
  type DietLog {
    id: ID! # This is the MongoDB _id
    userID: String!
    note: String
    calorieTaken: Float!
    log_timestamp: Date!
  }

  extend type Query {
    getDietLog(id: ID!): DietLog
    getDietLogs(userID: String!): [DietLog!]!
    getTodayDietLogs(userID: ID!): [DietLog!]!
  }

  extend type Mutation {
    createDietLog(
      userID: String!
      note: String
      calorieTaken: Float!
      log_timestamp: Date!
    ): DietLog!

    updateDietLog(
      id: ID! # Using MongoDB _id
      note: String
      calorieTaken: Float
    ): DietLog!

    deleteDietLog(id: ID!): String!
  }
`;
