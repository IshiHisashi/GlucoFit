import { gql } from "apollo-server-express";

export const medicineLogTypeDefs = gql`
  type MedicineLog {
    id: ID!
    user_id: User!  # Linked to User
    amount: Float!
    injection_time: Date!
  }

  extend type Query {
    getMedicineLog(id: ID!): MedicineLog
    getMedicineLogs: [MedicineLog!]!
    getMedicineLogsByUser(user_id: ID!): [MedicineLog!]!
    getTodayMedicineLogs(user_id: ID!): [MedicineLog!]!
  }

  extend type Mutation {
    createMedicineLog(
      user_id: ID!
      amount: Float!
      injection_time: Date!
    ): MedicineLog!

    updateMedicineLog(
      id: ID!
      amount: Float
      injection_time: Date
      time_period: String
    ): MedicineLog!

    deleteMedicineLog(id: ID!): String!
  }
`;
