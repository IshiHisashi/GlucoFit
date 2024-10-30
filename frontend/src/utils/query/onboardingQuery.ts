import { gql } from "@apollo/client";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String
    $birthday: Date
    $maximum_bsl: Float
    $minimum_bsl: Float
    $notification: Boolean
    $diabates_type: Int
    $height: Float
    $weight: Float
    $badges: [BadgeInput]
  ) {
    updateUser(
      id: $id
      name: $name
      birthday: $birthday
      maximum_bsl: $maximum_bsl
      minimum_bsl: $minimum_bsl
      notification: $notification
      diabates_type: $diabates_type
      height: $height
      weight: $weight
      badges: $badges
    ) {
      id
      name
    }
  }
`;

// Static
export const badges = [
  { badgeId: "670b2125cb185c3905515da2", achieved: false },
  { badgeId: "670b2149cb185c3905515da4", achieved: false },
  { badgeId: "670b215bcb185c3905515da6", achieved: false },
  { badgeId: "670b216fcb185c3905515da8", achieved: false },
  { badgeId: "670b2188cb185c3905515daa", achieved: false },
  { badgeId: "670b2192cb185c3905515dac", achieved: false },
  { badgeId: "670b2199cb185c3905515dae", achieved: false },
  { badgeId: "670b21a8cb185c3905515db0", achieved: false },
  { badgeId: "670b21b1cb185c3905515db2", achieved: false },
];

export const ADD_MEDICINE_MUTATION = gql`
  mutation AddMedicineToList(
    $user_id: ID!
    $medicine_name: String!
    $dosage: String
    $unit: String
    $log_timestamp: Date
  ) {
    addMedicineToList(
      user_id: $user_id
      medicine_name: $medicine_name
      dosage: $dosage
      unit: $unit
      log_timestamp: $log_timestamp
    ) {
      medicine_name
      log_timestamp
    }
  }
`;
