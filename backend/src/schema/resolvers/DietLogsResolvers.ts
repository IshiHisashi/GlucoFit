import { DietLogs, IDietLogs } from "../../model/DietLogs";

const dietLogsResolvers = {
  Query: {
    getDietLog: async (_: any, { id }: { id: string }): Promise<IDietLogs | null> => {
      return await DietLogs.findById(id); // Use MongoDB _id for fetching
    },
    getDietLogs: async (_: any, { userID }: { userID: string }): Promise<IDietLogs[]> => {
      return await DietLogs.find({ userID });
    },
    getTodayDietLogs: async (_: any, { userID }: { userID: string }): Promise<IDietLogs[]> => {
      try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0); // Set to start of today

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999); // Set to end of today

        // Fetch all diet logs for today
        const todayDietLogs = await DietLogs.find({
          userID: userID,
          logDateTime: { $gte: startOfDay, $lte: endOfDay },
        });

        return todayDietLogs;
      } catch (error) {
        console.error("Error fetching today's diet logs:", error);
        throw new Error("Failed to fetch today's diet logs");
      }
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
