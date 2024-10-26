import { gql } from "apollo-server-express";

export const articlesTypeDefs = gql`
  type Articles {
    id: ID!
    article_name: String!
    article_thumbnail_address: String!
    article_desc: String!
    article_url: String!
    article_genre: String!
    diabetes_type: String!
  }

  type ArticlesConnection {
    edges: [Articles]
    pageInfo: PageInfo
  }

  type PageInfo {
    hasNextPage: Boolean
    endCursor: String
  }

  extend type Query {
    getArticle(id: ID!): Articles
    getArticles: [Articles!]!
    getAllArticlesPagination(cursor: String, limit: Int): ArticlesConnection
    getUserArticlesPagination(
      userId: ID!
      cursor: String
      limit: Int
      classification: String
    ): ArticlesConnection
  }

  extend type Mutation {
    createArticle(
      article_name: String!
      article_thumbnail_address: String!
      article_desc: String!
      article_url: String!
      article_genre: String!
      diabetes_type: String!
    ): Articles!

    updateArticle(
      id: ID!
      article_name: String
      article_thumbnail_address: String
      article_desc: String
      article_url: String
      article_genre: String
      diabetes_type: String
    ): Articles!

    deleteArticle(id: ID!): String!

    toggleFavouriteArticle(userId: ID!, articleId: ID!): String!
  }
`;
