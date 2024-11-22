import { gql } from "@apollo/client";

export const GET_ALL_BADGES_INFO_BY_USER = gql`
  query GetUserBadge($getUserBadgeId: ID!) {
    getUserBadge(id: $getUserBadgeId) {
      id
      badges {
        badgeId {
          id
          badge_name
          badge_desc
          badge_image_address
          locked
          unlocked
          criteria {
            value
          }
        }
        achieved
      }
    }
  }
`;

export const GET_ALL_DATES_WITH_LOG_IN_A_MONTH = gql`
  query GetAllDates($userId: ID!, $year: Int!, $month: Int!) {
    getTestResultsDatesByMonth(user_id: $userId, year: $year, month: $month)
  }
`;
