import { gql } from "apollo-server-express";

export const activityLogsTypeDefs = gql`
  type ActivityLogs {
    id: ID!
    user_id: User!  # Linked to User
    footsteps: Int!
    calorie_burnt: Int!
    log_date: Date!
  }

  extend type Query {
    getActivityLog(id: ID!): ActivityLogs
    getActivityLogs: [ActivityLogs!]!
    getActivityLogsByUser(user_id: ID!): [ActivityLogs!]!
  }

  extend type Mutation {
    createActivityLog(
      user_id: ID!
      footsteps: Int!
      calorie_burnt: Int!
      log_date: Date!
    ): ActivityLogs!

    updateActivityLog(
      id: ID!
      footsteps: Int
      calorie_burnt: Int
      log_date: Date
    ): ActivityLogs!

    deleteActivityLog(id: ID!): String!
  }
`;
