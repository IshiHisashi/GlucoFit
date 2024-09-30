import { gql } from "apollo-server-express";

export const testResultsTypeDefs = gql`
  type TestResults {
    id: ID!
    user_id: User! # User is linked here
    bsl: Float
    note: Note
    log_timestamp: Date
    confirmed: Boolean
  }

  type Note {
    note_description: String
  }

  extend type Query {
    getTestResult(id: ID!): TestResults
    getTestResults: [TestResults!]!
    getTestResultsByUser(user_id: ID!): [TestResults!]!
  }

  extend type Mutation {
    createTestResult(
      user_id: ID!
      bsl: Float!
      note: NoteInput!
      log_timestamp: Date
      confirmed: Boolean
    ): TestResults!

    updateTestResult(
      id: ID!
      bsl: Float
      note: NoteInput
      log_timestamp: Date
      confirmed: Boolean
    ): TestResults!

    deleteTestResult(id: ID!): String!
  }

  input NoteInput {
    note_description: String!
  }
`;