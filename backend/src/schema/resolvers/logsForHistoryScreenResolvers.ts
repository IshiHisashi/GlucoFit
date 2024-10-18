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
        limit = 50,
      }: { user_id: string; startDate: any; endDate: any; limit: number }
    ) => {
      const queryArgs = {
        user_id,
        log_timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) },
      };
      const queryArgsForDietLogs = {
        userID: user_id.toString(),
        log_timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) },
      };

      // Query each collection
      const [glucoseLogs, activityLogs, dietLogs, medicineLogs] =
        await Promise.all([
          TestResults.find(queryArgs).populate("user_id"),
          ActivityLogs.find(queryArgs).populate("user_id"),
          DietLogs.find(queryArgsForDietLogs).populate("userID"),
          MedicineLog.find(queryArgs)
            .populate({
              path: "medicine_id",
              model: "UserMedicineList",
            })
            .populate("user_id")
            .exec(),
        ]);

      console.log("diet logs", dietLogs);

      // Combine and sort all logs
      const allLogs = [
        ...glucoseLogs.map((log: any) => ({
          ...log,
          id: log._id.toString(),
          bsl: log.bsl,
          log_timestamp: log.log_timestamp,
          __typename: "TestResults",
        })),
        ...activityLogs.map((log: any) => ({
          ...log,
          id: log._id.toString(),
          duration: log.duration,
          log_timestamp: log.log_timestamp,
          __typename: "ActivityLogs",
        })),
        ...dietLogs.map((log: any) => ({
          ...log,
          id: log._id.toString(),
          carbs: log.carbs,
          log_timestamp: log.log_timestamp,
          __typename: "DietLog",
        })),
        ...medicineLogs.map((log: any) => ({
          ...log,
          id: log._id.toString(),
          amount: log.amount,
          log_timestamp: log.log_timestamp,
          medicine_id: {
            id: log.medicine_id._id.toString(),
            unit: log.medicine_id.unit,
            medicine_name: log.medicine_id.medicine_name,
          },
          __typename: "MedicineLog",
        })),
      ]
        // .filter((log) => log.id != null)
        .sort((a: any, b: any) => b.log_timestamp - a.log_timestamp);

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
