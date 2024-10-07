import { gql } from "apollo-server-express";
import { DirectiveLocation } from "graphql";

export const userTypeDefs = gql`
  scalar Date
  scalar JSON

  type User {
    id: ID!
    name: String!
    age: Int
    diabates_type: Int
    email: String
    phone_number: String
    password: String
    maximum_bsl: Float
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
    badges: JSON
    recently_read_articles_array: [String]
    active_status: Boolean
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
  }

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
      badges: JSON
      recently_read_articles_array: [String]
      active_status: Boolean
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
      badges: JSON
      recently_read_articles_array: [String]
      active_status: Boolean
    ): User!

    deleteUser(id: ID!): String!
  }
`;
