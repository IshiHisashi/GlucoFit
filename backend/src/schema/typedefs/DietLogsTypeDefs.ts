import { gql } from "apollo-server-express";

export const dietLogsTypeDefs = gql`
  type Note {
    title: String
    content: String
  }

  type DietLog {
    id: ID! # This is the MongoDB _id
    userID: String!
    note: Note
    carbs: Float!
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
      note: NoteInput
      carbs: Float!
      log_timestamp: Date!
    ): DietLog!

    updateDietLog(
      id: ID! # Using MongoDB _id
      note: NoteInput
      carbs: Float
    ): DietLog!

    deleteDietLog(id: ID!): String!
  }

  input NoteInput {
    note_description: String!  
    title: String
    content: String
  }
  
`;
