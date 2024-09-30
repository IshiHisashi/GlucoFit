import { gql } from "apollo-server-express";

export const articlesTypeDefs = gql`
  type Articles {
    id: ID!
    article_id: String!
    article_name: String!
    article_thumbnail_address: String!
    article_desc: String!
    article_url: String!
    article_genre: String!
    diabetes_type: String!
  }

  extend type Query {
    getArticle(id: ID!): Articles
    getArticles: [Articles!]!
  }

  extend type Mutation {
    createArticle(
      article_id: String!
      article_name: String!
      article_thumbnail_address: String!
      article_desc: String!
      article_url: String!
      article_genre: String!
      diabetes_type: String!
    ): Articles!

    updateArticle(
      id: ID!
      article_id: String
      article_name: String
      article_thumbnail_address: String
      article_desc: String
      article_url: String
      article_genre: String
      diabetes_type: String
    ): Articles!

    deleteArticle(id: ID!): String!
  }
`;
