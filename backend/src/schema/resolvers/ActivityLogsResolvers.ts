import { ActivityLogs, IActivityLogs } from "../../model/ActivityLogs";
import { Types } from "mongoose";
import moment from "moment-timezone";

const activityLogsResolvers = {
  Query: {
    getActivityLog: async (
      _: any,
      { id }: { id: string }
    ): Promise<IActivityLogs | null> => {
      return await ActivityLogs.findById(id);
    },
    getActivityLogs: async (): Promise<IActivityLogs[]> => {
      return await ActivityLogs.find();
    },
    getActivityLogsByUser: async (_: any, { user_id }: { user_id: string }) => {
      return await ActivityLogs.find({ user_id }).populate("user_id");
    },

    // Query to get total footsteps for today for a specific user
    getTotalStepsForToday: async (
      _: any,
      { user_id }: { user_id: string }
    ): Promise<number> => {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0); // Start of the day: 00:00:00

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // End of the day: 23:59:59

      // MongoDB aggregation query to sum the footsteps for today
      const result = await ActivityLogs.aggregate([
        {
          $match: {
            user_id: new Types.ObjectId(user_id),
            log_timestamp: { $gte: startOfDay, $lt: endOfDay }, // Filter by today's date
          },
        },
        {
          $group: {
            _id: null, // No specific grouping, just sum for all logs for this user
            totalFootsteps: { $sum: "$footsteps" }, // Sum the footsteps field
          },
        },
      ]);

      // If no activity logs exist for today, return 0
      return result.length > 0 ? result[0].totalFootsteps : 0;
    },

    getTodayActivityLogs: async (
      _: any,
      { user_id }: { user_id: string }
    ): Promise<IActivityLogs[]> => {
      try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0); // Set to start of today

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999); // Set to end of today

        // Fetch all activity logs for today
        const todayActivityLogs = await ActivityLogs.find({
          user_id: new Types.ObjectId(user_id),
          log_timestamp: { $gte: startOfDay, $lte: endOfDay },
        });

        return todayActivityLogs;
      } catch (error) {
        console.error("Error fetching today's activity logs:", error);
        throw new Error("Failed to fetch today's activity logs");
      }
    },
    getStreakActivityLogs: async (
      _: any,
      { user_id }: { user_id: string }
    ): Promise<number> => {
      try {
        // Fetch activity logs for the user
        const activityLogs = await ActivityLogs.find({
          user_id: new Types.ObjectId(user_id),
        })
          .sort({ log_timestamp: 1 })
          .exec();

        if (!activityLogs.length) return 0;

        const days = new Set<string>();

        activityLogs.forEach((log) => {
          const utcDate = moment.utc(log.log_timestamp).format("YYYY-MM-DD");
          days.add(utcDate);
        });

        const uniqueDays = Array.from(days).sort();
        const today = moment.tz("America/Vancouver").startOf("day");
        const yesterday = moment
          .tz("America/Vancouver")
          .subtract(1, "days")
          .startOf("day");

        let streak = 0;
        let currentStreak = 0;

        for (let i = uniqueDays.length - 1; i >= 0; i--) {
          const currentDay = moment.utc(uniqueDays[i], "YYYY-MM-DD");

          if (i === uniqueDays.length - 1) {
            const diffFromToday = today.diff(currentDay, "days");
            const diffFromYesterday = yesterday.diff(currentDay, "days");

            console.log(
              `Checking first log day (UTC): ${uniqueDays[i]} (diffFromToday: ${diffFromToday}, diffFromYesterday: ${diffFromYesterday})`
            );

            if (diffFromToday === 0) {
              currentStreak = 1;
            } else if (diffFromYesterday === 0) {
              currentStreak = 1;
            } else {
              return 0;
            }
          } else {
            const prevDay = moment.utc(uniqueDays[i + 1], "YYYY-MM-DD");
            const diff = prevDay.diff(currentDay, "days");

            if (diff === 1) {
              currentStreak++;
            } else {
              break;
            }
          }
          streak = Math.max(streak, currentStreak);
        }

        return streak;
      } catch (error) {
        console.error(
          "Error calculating streak of consecutive activity logs:",
          error
        );
        throw new Error(
          "Failed to calculate streak of consecutive activity logs"
        );
      }
    },
  },

  Mutation: {
    createActivityLog: async (
      _: any,
      args: IActivityLogs
    ): Promise<IActivityLogs> => {
      const newActivityLog = new ActivityLogs(args);
      return await newActivityLog.save();
    },
    updateActivityLog: async (
      _: any,
      { id, ...args }: { id: string } & Partial<IActivityLogs>
    ): Promise<IActivityLogs | null> => {
      return await ActivityLogs.findByIdAndUpdate(id, args, { new: true });
    },
    deleteActivityLog: async (
      _: any,
      { id }: { id: string }
    ): Promise<string> => {
      await ActivityLogs.findByIdAndDelete(id);
      return "ActivityLog deleted successfully";
    },
  },
};

export default activityLogsResolvers;
