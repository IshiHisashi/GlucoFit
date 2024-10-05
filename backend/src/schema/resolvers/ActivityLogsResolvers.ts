import { ActivityLogs, IActivityLogs } from "../../model/ActivityLogs";
import { Types } from "mongoose";

const activityLogsResolvers = {
  Query: {
    getActivityLog: async (_: any, { id }: { id: string }): Promise<IActivityLogs | null> => {
      return await ActivityLogs.findById(id);
    },
    getActivityLogs: async (): Promise<IActivityLogs[]> => {
      return await ActivityLogs.find();
    },
    getActivityLogsByUser: async (_: any, { user_id }: { user_id: string }) => {
      return await ActivityLogs.find({ user_id }).populate("user_id");
    },

    // Query to get total footsteps for today for a specific user
    getTotalStepsForToday: async (_: any, { user_id }: { user_id: string }): Promise<number> => {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0); // Start of the day: 00:00:00

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // End of the day: 23:59:59

      // MongoDB aggregation query to sum the footsteps for today
      const result = await ActivityLogs.aggregate([
        {
          $match: {
            user_id: new Types.ObjectId(user_id),
            log_date: { $gte: startOfDay, $lt: endOfDay }  // Filter by today's date
          }
        },
        {
          $group: {
            _id: null,  // No specific grouping, just sum for all logs for this user
            totalFootsteps: { $sum: "$footsteps" }  // Sum the footsteps field
          }
        }
      ]);

      // If no activity logs exist for today, return 0
      return result.length > 0 ? result[0].totalFootsteps : 0;
    }
  },

  Mutation: {
    createActivityLog: async (_: any, args: IActivityLogs): Promise<IActivityLogs> => {
      const newActivityLog = new ActivityLogs(args);
      return await newActivityLog.save();
    },
    updateActivityLog: async (_: any, { id, ...args }: { id: string } & Partial<IActivityLogs>): Promise<IActivityLogs | null> => {
      return await ActivityLogs.findByIdAndUpdate(id, args, { new: true });
    },
    deleteActivityLog: async (_: any, { id }: { id: string }): Promise<string> => {
      await ActivityLogs.findByIdAndDelete(id);
      return "ActivityLog deleted successfully";
    },
  },
};

export default activityLogsResolvers;
