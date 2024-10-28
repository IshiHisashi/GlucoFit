import { ActivityLogs, IActivityLogs } from "../../model/ActivityLogs";
import { Types } from "mongoose";
import { calculateActivityStreak } from "../../utils/activityLogsUtils";
import { User } from "../../model/User";
import { Badges, IBadges } from "../../model/Badges";

const updateUserBadgeById = async (
  userId: string,
  badgeId: string,
  achieved: boolean
): Promise<any> => {
  return await User.findOneAndUpdate(
    { _id: userId, "badges.badgeId": badgeId },
    { $set: { "badges.$.achieved": achieved } },
    { new: true }
  );
};

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
        return await calculateActivityStreak(user_id);
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
      {
        user_id,
        footsteps,
        duration,
        time_period,
      }: {
        user_id: string;
        footsteps: number;
        duration: number;
        time_period: string;
      }
    ): Promise<IBadges | null> => {
      // Create a new activity log
      try {
        const newActivityLog = new ActivityLogs({
          user_id,
          footsteps,
          duration,
          time_period,
          log_timestamp: new Date(),
        });
        await newActivityLog.save();
        // See if user's badges have
        const user = await User.findById(user_id);
        if (!user) {
          throw new Error("User not found");
        }

        const badges = user.badges;
        const targetBadge = badges.find(
          (badge) => badge.badgeId.toString() === "670b2192cb185c3905515dac"
        );
        if (targetBadge?.achieved) {
          return null;
        }
        // Count streak
        const streakCount = await calculateActivityStreak(user_id);
        // See if it meets the criteria
        if (streakCount >= 8) {
          // This should actually be 14, but decrease the number for the ease of frontend implementation.
          await updateUserBadgeById(user_id, "670b2192cb185c3905515dac", true);

          const badgeDetails = (await Badges.findById(
            "670b2192cb185c3905515dac"
          )) as IBadges | null;

          return badgeDetails;
        }
        return null;
      } catch (error: any) {
        console.error("Error creating activity log:", error);
        throw new Error("Failed to create activity log and check badge streak");
      }
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
