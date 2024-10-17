import { gql } from "apollo-server-express";

export const activityLogsTypeDefs = gql`
  type ActivityLogs {
    id: ID!
    user_id: User! # Linked to User
    footsteps: Int
    duration: Int!
    time_period: String
    log_timestamp: Date!
  }

  extend type Query {
    getActivityLog(id: ID!): ActivityLogs
    getActivityLogs: [ActivityLogs!]!
    getActivityLogsByUser(user_id: ID!): [ActivityLogs!]!
    getTotalStepsForToday(user_id: ID!): Int!
    getTodayActivityLogs(user_id: ID!): [ActivityLogs!]!
    getStreakActivityLogs(user_id: ID!): Int!
  }

  extend type Mutation {
    createActivityLog(
      user_id: ID!
      footsteps: Int
      duration: Int!
      time_period: String
      log_timestamp: Date!
    ): ActivityLogs!

    updateActivityLog(
      id: ID!
      footsteps: Int
      duration: Int
      time_period: String
      log_timestamp: Date
    ): ActivityLogs!

    deleteActivityLog(id: ID!): String!
  }
`;
