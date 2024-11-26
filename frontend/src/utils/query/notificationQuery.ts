import { gql } from "@apollo/client";

export const GET_USER_NOTIFICATIONS = gql`
  query GetUserNotifications($user_id: ID!) {
    getUserNotifications(user_id: $user_id) {
      id
      title
      description
      type
      read
      createdAt
    }
  }
`;

export const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($id: ID!) {
    markNotificationAsRead(id: $id) {
      id
      read
    }
  }
`;

export const HAS_UNREAD_NOTIFICATION = gql`
  query HasUnreadNotification($user_id: ID!) {
    hasUnreadNotification(user_id: $user_id)
  }
`;
