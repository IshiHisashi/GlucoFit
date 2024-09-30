import { InsulinLog, IInsulinLog } from "../../model/InsulinLog";
import { Types, ObjectId } from "mongoose";

const insulinLogResolvers = {
  Query: {
    getInsulinLog: async (
      _: any,
      { id }: { id: string }
    ): Promise<IInsulinLog | null> => {
      return await InsulinLog.findById(id);
    },
    getInsulinLogs: async (): Promise<IInsulinLog[]> => {
      return await InsulinLog.find();
    },
    getInsulinLogsByUser: async (_: any, { user_id }: { user_id: string }) => {
      return await InsulinLog.find({ user_id }).populate("user_id");
    },
  },
  Mutation: {
    createInsulinLog: async (
      _: any,
      args: IInsulinLog
    ): Promise<IInsulinLog> => {
      const newInsulinLog = new InsulinLog(args);
      return (await newInsulinLog.save()).populate("user_id");
    },
    updateInsulinLog: async (
      _: any,
      { id, ...args }: { id: string } & Partial<IInsulinLog>
    ): Promise<IInsulinLog | null> => {
      return await InsulinLog.findByIdAndUpdate(id, args, { new: true });
    },

    deleteInsulinLog: async (
      _: any,
      { id }: { id: string }
    ): Promise<string> => {
      await InsulinLog.findByIdAndDelete(id);
      return "InsulinLog deleted successfully";
    },
  },
};

export default insulinLogResolvers;
