import { gql } from "apollo-server-express";

export const logsForHistoryScreenTypeDefs = gql`
  type GlucoseLog {
    id: ID!
    bsl: Float!
    note: String
    log_timestamp: Date!
    confirmed: Boolean
  }

  type ActivityLog {
    id: ID!
    footsteps: Int!
    duration: Int!
    log_timestamp: Date!
  }

  type DietLog {
    id: ID!
    note: String
    calorieTaken: Float!
    log_timestamp: Date!
  }

  type MedicineLog {
    id: ID!
    amount: Float!
    log_timestamp: Date!
  }

  union LogEntry = GlucoseLog | ActivityLog | DietLog | MedicineLog

  type CombinedLogsResponse {
    logs: [LogEntry!]!
    hasMoreData: Boolean!
  }

  type Query {
    getCombinedLogsByDateRange(
      user_id: ID!
      startDate: Date!
      endDate: Date!
      limit: Int
    ): CombinedLogsResponse!
  }
`;
