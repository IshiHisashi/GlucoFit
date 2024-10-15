import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  scalar Date
  scalar JSON

  # Badge Criteria Type
  type BadgeCriteria {
    value: Float!
    comparison: String!
    kind: String!
    note: String
  }

  # BadgeDetails type for the populated badge information
  type BadgeDetails {
    _id: String
    badge_name: String
    badge_desc: String
    criteria: BadgeCriteria
  }

  # Badge type for querying user badges (includes badgeId and badge details)
  type Badge {
    badgeId: BadgeDetails
    achieved: Boolean
    progress: Float
  }

  # Input type for mutations
  input BadgeInput {
    badgeId: ID!
    achieved: Boolean
    progress: Float
  }

  # User type for querying
  type User {
    id: ID!
    name: String!
    age: Int
    diabates_type: Int
    email: String
    phone_number: String
    password: String
    maximum_bsl: Float
    minimum_bsl: Float
    bsl_goal: Float
    footsteps_goal: Int
    test_streak_counter: Int
    stable_bsl_counter: Int
    notification: Boolean
    latest_log_timestamp: Date
    last_insulin_intake: Date
    iHealth_user_id: String
    iHealth_access_token: String
    ihealth_device_iD: String
    apple_health_token: String
    apple_health_id: String
    android_health_token: String
    android_health_id: String
    badges: [Badge]
    recently_read_articles_array: [String]
    active_status: Boolean
    create_day: String
  }

  # AuthPayload type
  type AuthPayload {
    token: String!
    user: User!
  }

  # Queries
  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
    getUserBadge(id: ID!): User
  }

  # Mutations
  type Mutation {
    signUp(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!

    createUser(
      name: String!
      age: Int
      diabates_type: Int
      email: String
      phone_number: String
      password: String
      maximum_bsl: Float
      minimum_bsl: Float
      bsl_goal: Float
      footsteps_goal: Int
      test_streak_counter: Int
      stable_bsl_counter: Int
      notification: Boolean
      latest_log_timestamp: Date
      last_insulin_intake: Date
      iHealth_user_id: String
      iHealth_access_token: String
      iHealth_refresh_token: String
      ihealth_device_iD: String
      apple_health_token: String
      apple_health_id: String
      android_health_token: String
      android_health_id: String
      badges: [BadgeInput!] # Use BadgeInput for mutations
      read_article_history_array: [String]
      recently_read_articles_array: [String]
      active_status: Boolean
      favourite_articles: [String]
      create_day: String
    ): User!

    updateUser(
      id: ID!
      name: String
      age: Int
      diabates_type: Int
      email: String
      phone_number: String
      password: String
      maximum_bsl: Float
      minimum_bsl: Float
      bsl_goal: Float
      footsteps_goal: Int
      test_streak_counter: Int
      stable_bsl_counter: Int
      notification: Boolean
      latest_log_timestamp: Date
      last_insulin_intake: Date
      iHealth_user_id: String
      iHealth_access_token: String
      iHealth_refresh_token: String
      ihealth_device_iD: String
      apple_health_token: String
      apple_health_id: String
      android_health_token: String
      android_health_id: String
      badges: [BadgeInput!] # Use BadgeInput for mutations
      read_article_history_array: [String]
      recently_read_articles_array: [String]
      active_status: Boolean
      favourite_articles: [String]
      create_day: String
    ): User!

    deleteUser(id: ID!): String!
  }
`;
