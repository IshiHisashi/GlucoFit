import { gql } from "apollo-server-express";

export const logsForHistoryScreenTypeDefs = gql`
  type TestResults {
    id: ID!
    log_timestamp: Date!
  }

  type ActivityLogs {
    id: ID!
  }

  type DietLog {
    id: ID!
  }

  type MedicineLog {
    id: ID!
  }

  union LogEntry = TestResults | ActivityLogs | DietLog | MedicineLog

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
