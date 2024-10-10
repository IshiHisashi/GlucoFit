import { DietLogs, IDietLogs } from "../../model/DietLogs";

const dietLogsResolvers = {
  Query: {
    getDietLog: async (_: any, { id }: { id: string }): Promise<IDietLogs | null> => {
      return await DietLogs.findById(id); // Use MongoDB _id for fetching
    },
    getDietLogs: async (_: any, { userID }: { userID: string }): Promise<IDietLogs[]> => {
      return await DietLogs.find({ userID });
    },
  },
  Mutation: {
    createDietLog: async (_: any, args: IDietLogs): Promise<IDietLogs> => {
      const newDietLog = new DietLogs(args);
      return await newDietLog.save(); // MongoDB will auto-generate _id
    },
    updateDietLog: async (
      _: any,
      { id, ...args }: { id: string } & Partial<IDietLogs>
    ): Promise<IDietLogs | null> => {
      return await DietLogs.findByIdAndUpdate(id, args, { new: true });
    },
    deleteDietLog: async (_: any, { id }: { id: string }): Promise<string> => {
      await DietLogs.findByIdAndDelete(id);
      return "Diet Log deleted successfully";
    },
  },
};

export default dietLogsResolvers;
