import { gql } from "apollo-server-express";

export const testResultsTypeDefs = gql`
  type TestResults {
    id: ID!
    user_id: User! # User is linked here
    bsl: Float
    note: Note
    log_timestamp: Date
    time_period : String
    confirmed: Boolean
  }

  type Note {
    note_description: String
  }

  type TestResultsAndAverage {
    testResults: [TestResults!]!
    averageBsl: Float
  }

  type WeeklyBSLResponse {
    weeklyData: [BSLData!]!
    weeklyAverage: Float!
    dateRange: String! 
  }

  type BSLData {
    day: String!
    value: Float!
  }

  extend type Query {
    getTestResult(id: ID!): TestResults
    getTestResults: [TestResults!]!
    getTestResultsByUser(user_id: ID!): [TestResults!]!
    getUnconfirmedTestResults(user_id: ID!): [TestResults!]!
    getTestResultsAndAverageForToday(user_id: ID!): TestResultsAndAverage!
    getWeeklyBSLData(user_id: ID!): WeeklyBSLResponse!
    getAverageBslXAxisValue(user_id: ID!): Float
    getStreakTestResults(user_id: ID!, withThreshold: Boolean!): Int!
    getStreakByTimeRange(user_id: ID!, startHour: Int!, endHour: Int!): Int!
    getTestResultsDatesByMonth(
      user_id: ID!
      year: Int!
      month: Int!
    ): [String!]!
    getTestResultsLast7Days(user_id: ID!): [String!]!
  }

  extend type Mutation {
    createTestResult(
      user_id: ID!
      bsl: Float!
      note: NoteInput!
      log_timestamp: Date
      time_period : String
      confirmed: Boolean
    ): TestResults!

    createTestResultWithInsights(
      user_id: ID!, 
      bsl: Float!, 
      note: String!, 
      time_period: String, 
      confirmed: Boolean
    ): [Articles]

    updateTestResult(
      id: ID!
      bsl: Float
      note: NoteInput
      log_timestamp: Date
      time_period : String
      confirmed: Boolean
    ): TestResults!

    deleteTestResult(id: ID!): String!
  }

  input NoteInput {
    note_description: String!
  }
`;
