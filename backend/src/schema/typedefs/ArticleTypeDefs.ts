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
    isFavorite: Boolean!
  }

  type ArticlesConnection {
    edges: [Articles]
    pageInfo: PageInfo
  }

  type PageInfo {
    hasNextPage: Boolean
    endCursor: String
  }

  type FavouriteArticleResponse {
    badge: Badges
    message: String
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
    getArticle(id: ID!, userId: ID!): Articles
    getArticles: [Articles!]!
    getAllArticlesPagination(cursor: String, limit: Int, userId: ID!): ArticlesConnection
    getUserArticlesPagination(
      userId: ID!
      cursor: String
      limit: Int
      classification: String
    ): ArticlesConnection
    getArticlesBySearch(searchWord: String!): [Articles!]!
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

    toggleFavouriteArticle(
      userId: ID!
      articleId: ID!
    ): FavouriteArticleResponse
  }
`;
