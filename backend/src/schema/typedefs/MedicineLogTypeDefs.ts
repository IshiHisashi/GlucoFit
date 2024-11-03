import { gql } from "apollo-server-express";

export const medicineLogTypeDefs = gql`
  type UserMedicineList {
    id: ID!
    user_id: User!
    medicine_name: String!
    dosage: String
    unit: String
    log_timestamp: Date
  }

  type MedicineLog {
    id: ID!
    user_id: User! # Linked to User
    medicine_id: UserMedicineList! # Linked to User's medicine list
    amount: Float!
    log_timestamp: Date!
  }
  type UserMedicine {
    id: ID!
    user_id: User!
    medicine_name: String!
    dosage: String
    unit: String
    log_timestamp: Date
  }
  extend type Query {
    getMedicineLog(id: ID!): MedicineLog
    getMedicineLogs: [MedicineLog!]!
    getMedicineLogsByUser(user_id: ID!): [MedicineLog!]!
    getTodayMedicineLogs(user_id: ID!): [MedicineLog!]!
    getUserMedicineList(user_id: ID!): [UserMedicine!]!
  }

  extend type Mutation {
    addMedicineToList(
      user_id: ID!
      medicine_name: String!
      dosage: String
      unit: String
      log_timestamp: Date
    ): UserMedicineList!

    createMedicineLog(
      user_id: ID!
      medicine_id: ID! # Refers to a specific medicine from UserMedicineList
      amount: Float!
      log_timestamp: Date!
    ): MedicineLog!

    updateMedicineLog(
      id: ID!
      medicine_id: ID # Optional update to link a different medicine
      amount: Float
      log_timestamp: Date
    ): MedicineLog!

    deleteMedicineLog(id: ID!): String!
  }
`;
