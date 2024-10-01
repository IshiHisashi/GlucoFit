import { ActivityLogs, IActivityLogs } from "../../model/ActivityLogs";
import { Types, ObjectId } from "mongoose";

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
  },
  Mutation: {
    createActivityLog: async (
      _: any,
      args: IActivityLogs
    ): Promise<IActivityLogs> => {
      const newActivityLog = new ActivityLogs(args);
      return (await newActivityLog.save()).populate("user_id");
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
