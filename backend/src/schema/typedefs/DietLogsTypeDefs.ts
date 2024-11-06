import { gql } from "apollo-server-express";

export const dietLogsTypeDefs = gql`
type Note {
  note_title: String
  note_description: String
}


  type DietLog {
    id: ID! # This is the MongoDB _id
    userID: String!
    time_period: String! 
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
      time_period: String! 
      note: NoteInput
      carbs: Float!
      log_timestamp: Date!
    ): DietLog!

    updateDietLog(
      id: ID! # Using MongoDB _id
      time_period: String
      note: NoteInput
      carbs: Float
    ): DietLog!

    deleteDietLog(id: ID!): String!
  }

  input NoteInput {
    note_title: String!  
    note_description: String!
  }
  
`;
