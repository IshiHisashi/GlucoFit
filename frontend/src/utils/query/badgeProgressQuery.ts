import { gql } from "@apollo/client";
// Main Query to Get User's Badges
export const GET_USER_ON_PROGRESS_BADGES = gql`
  query GetUserOnProgressBadges($id: ID!) {
    getUserOnProgressBadge(id: $id) {
      badges {
        badgeId {
          id
          badge_name
          badge_desc
          badge_image_address
          criteria {
            value
            comparison
          }
        }
        achieved
      }
    }
  }
`;

// Query to Fetch Data for a Specific Badge (Streak Starter)
export const QUERY_FOR_STREAK_STARTER = gql`
  query GetStreakWithThreshold($userId: ID!, $withThreshold: Boolean!) {
    getStreakTestResults(user_id: $userId, withThreshold: $withThreshold)
  }
`;

export const QUERY_FOR_STREAK_BY_TIME_RANGE = gql`
  query GetStreakByTimeRange($userId: ID!, $startHour: Int!, $endHour: Int!) {
    getStreakByTimeRange(
      user_id: $userId
      startHour: $startHour
      endHour: $endHour
    )
  }
`;

export const QUERY_FOR_STREAK_ACTIVITYLOGS = gql`
  query GetStreakActivityLogs($userId: ID!) {
    getStreakActivityLogs(user_id: $userId)
  }
`;

export const GET_NUM_FAVORITE_ARTICLE = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      favourite_articles
    }
  }
`;

export const GET_STREAK_LAST_7_DAYS = gql`
  query GetStreakLast7Days($userId: ID!) {
    getTestResultsLast7Days(user_id: $userId)
  }
`