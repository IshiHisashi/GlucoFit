import { gql } from "apollo-server-express";
import GraphQLJSON from "graphql-type-json";

export const typeDefs = gql`
  scalar Date
  scalar JSON

  type User {
    id: ID!
    name: String!
    age: Int
    diabates_type: Int
    email: String
    phone_number: String
    password_token: String
    maximum_bsl: Float
    bsl_goal: Float
    footsteps_goal: Int
    test_streak_counter: Int
    stable_bsl_counter: Int
    notification: Boolean
    latest_log_timestamp: Date
    last_insulin_intake: Date
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

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
  }

  type Mutation {
    createUser(
      name: String!
      age: Int
      diabates_type: Int
      email: String
      phone_number: String
      password_token: String
      maximum_bsl: Float
      bsl_goal: Float
      footsteps_goal: Int
      test_streak_counter: Int
      stable_bsl_counter: Int
      notification: Boolean
      latest_log_timestamp: Date
      last_insulin_intake: Date
      iHealth_access_token: String
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
      password_token: String
      maximum_bsl: Float
      bsl_goal: Float
      footsteps_goal: Int
      test_streak_counter: Int
      stable_bsl_counter: Int
      notification: Boolean
      latest_log_timestamp: Date
      last_insulin_intake: Date
      iHealth_access_token: String
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
