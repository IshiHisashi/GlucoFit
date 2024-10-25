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
          criteria {
            value
            comparison
            kind
            note
          }
          last_updated
        }
        achieved
        progress
      }
    }
  }
`