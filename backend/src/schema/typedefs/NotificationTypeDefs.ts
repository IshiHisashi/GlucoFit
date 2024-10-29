// schema/notificationTypeDefs.ts
import { gql } from "apollo-server-express";

export const notificationTypeDefs = gql`
  type Notification {
    id: ID!
    user_id: ID!
    title: String!
    description: String!
    type: String!
    createdAt: String!
    read: Boolean!
  }

  extend type Query {
    getUserNotifications(user_id: ID!, unreadOnly: Boolean): [Notification]
  }

  extend type Mutation {
    createNotification(
      user_id: ID!
      title: String!
      description: String!
      type: String!
    ): Notification

    markNotificationAsRead(id: ID!): Notification

    markAllNotificationsAsRead(user_id: ID!): [Notification]
  }
`;
