import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    name: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
  }

  type Mutation {
    # User
    createUser(name: String!): User!
    updateUser(id: ID!, name: String!): User!
    deleteUser(id: ID!): String!
  }
`;
