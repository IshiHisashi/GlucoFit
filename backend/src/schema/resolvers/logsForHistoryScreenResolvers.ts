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
        goBackTillThisDate,
        latestDate,
      }: { user_id: string; goBackTillThisDate: any; latestDate: any }
    ) => {
      const queryArgs = {
        user_id,
        log_timestamp: {
          $gt: new Date(goBackTillThisDate),
          $lte: new Date(latestDate),
        },
      };
      const queryArgsForDietLogs = {
        userID: user_id.toString(),
        log_timestamp: {
          $gt: new Date(goBackTillThisDate),
          $lte: new Date(latestDate),
        },
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
          activityType: log.activityType,
          log_timestamp: log.log_timestamp,
          __typename: "ActivityLogs",
        })),
        ...dietLogs.map((log: any) => ({
          ...log,
          id: log._id.toString(),
          time_period: log.time_period,
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

      const hasMoreData = allLogs.length > 0;

      return {
        logs: allLogs,
        hasMoreData,
        nextLatestDate: goBackTillThisDate,
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
