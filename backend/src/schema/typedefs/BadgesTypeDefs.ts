import { gql } from "apollo-server-express";

export const badgesTypeDefs = gql`
  type Badges {
    id: ID!
    badge_id: String!
    badge_name: String!
    badge_desc: String!
    badge_image_address: String!
  }

  extend type Query {
    getBadge(id: ID!): Badges
    getBadges: [Badges!]!
  }

  extend type Mutation {
    createBadge(
      badge_id: String!
      badge_name: String!
      badge_desc: String!
      badge_image_address: String!
    ): Badges!

    updateBadge(
      id: ID!
      badge_id: String
      badge_name: String
      badge_desc: String
      badge_image_address: String
    ): Badges!

    deleteBadge(id: ID!): String!
  }
`;
