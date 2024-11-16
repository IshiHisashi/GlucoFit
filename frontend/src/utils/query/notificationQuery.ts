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
