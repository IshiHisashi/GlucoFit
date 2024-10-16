import { Kind } from "graphql";
import { ActivityLogs } from "../../model/ActivityLogs";
import { DietLogs } from "../../model/DietLogs";
import { MedicineLog } from "../../model/MedicineLog";
import { TestResults } from "../../model/TestResults";

const logsForHistoryScreenResolvers = {
  Query: {
    getCombinedLogsByDateRange: async (
      _: any,
      {
        user_id,
        startDate,
        endDate,
        limit = 100,
      }: { user_id: string; startDate: any; endDate: any; limit: number }
    ) => {
      const queryArgs = {
        user_id,
        log_timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) },
      };

      // Query each collection
      const [glucoseLogs, activityLogs, dietLogs, medicineLogs] =
        await Promise.all([
          TestResults.find(queryArgs).lean(),
          ActivityLogs.find(queryArgs).lean(),
          DietLogs.find({ ...queryArgs, userID: user_id.toString() }).lean(),
          MedicineLog.find(queryArgs).lean(),
        ]);

      // Combine and sort all logs
      const allLogs = [
        ...glucoseLogs.map((log) => ({ ...log, __typename: "GlucoseLog" })),
        ...activityLogs.map((log) => ({ ...log, __typename: "ActivityLog" })),
        ...dietLogs.map((log) => ({ ...log, __typename: "DietLog" })),
        ...medicineLogs.map((log) => ({ ...log, __typename: "MedicineLog" })),
      ].sort((a: any, b: any) => b.log_timestamp - a.log_timestamp);

      const hasMoreData = allLogs.length > limit;
      const logsToReturn = allLogs.slice(0, limit);

      return {
        logs: logsToReturn,
        hasMoreData,
      };
    },
  },

  LogEntry: {
    __resolveType(obj: any) {
      return obj.__typename;
    },
  },
};

export default logsForHistoryScreenResolvers;
