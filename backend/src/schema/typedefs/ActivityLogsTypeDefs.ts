import { gql } from "apollo-server-express";

export const activityLogsTypeDefs = gql`
  type ActivityLogs {
    id: ID!
    user_id: User! # Linked to User
    footsteps: Int
    activityType: String!
    duration: Int!
    log_timestamp: Date!
  }

  type BadgeCriteria {
    value: Float!
    comparison: String!
    kind: String!
    note: String
  }
  type Badges {
    id: ID!
    badge_name: String!
    badge_desc: String!
    badge_image_address: String!
    criteria: BadgeCriteria!
    last_updated: Date
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
      activityType: String!
      duration: Int!
      log_timestamp: Date
    ): Badges

    updateActivityLog(
      id: ID!
      footsteps: Int
      activityType: String!
      duration: Int
      log_timestamp: Date
    ): ActivityLogs!

    deleteActivityLog(id: ID!): String!
  }
`;
