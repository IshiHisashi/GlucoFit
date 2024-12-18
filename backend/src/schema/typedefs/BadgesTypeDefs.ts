import { gql } from "apollo-server-express";

export const badgesTypeDefs = gql`
  scalar Date

  type BadgeCriteria {
    value: Float!
    comparison: String!
    kind: String!
    note: String
  }

  input BadgeCriteriaInput {
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
    locked: String
    unlocked: String
  }

  extend type Query {
    getBadge(id: ID!): Badges
    getBadges: [Badges!]!
  }

  extend type Mutation {
    createBadge(
      badge_name: String!
      badge_desc: String!
      badge_image_address: String!
      criteria: BadgeCriteriaInput!
      locked: String
      unlocked: String
    ): Badges!

    updateBadge(
      id: ID!
      badge_name: String
      badge_desc: String
      badge_image_address: String
      criteria: BadgeCriteriaInput # last_updated is not necessary for now
      locked: String
      unlocked: String
    ): Badges!

    deleteBadge(id: ID!): String!
  }
`;
