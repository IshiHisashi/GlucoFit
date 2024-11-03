import { DietLogs, IDietLogs } from "../../model/DietLogs";

const dietLogsResolvers = {
  Query: {
    getDietLog: async (_: any, { id }: { id: string }): Promise<IDietLogs | null> => {
      return await DietLogs.findById(id); 
    },
    getDietLogs: async (_: any, { userID }: { userID: string }): Promise<IDietLogs[]> => {
      return await DietLogs.find({ userID });
    },
    getTodayDietLogs: async (_: any, { userID }: { userID: string }): Promise<IDietLogs[]> => {
      try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
    
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
    
        const todayDietLogs = await DietLogs.find({
          userID: userID,
          log_timestamp: { $gte: startOfDay, $lte: endOfDay },
        });
        
        return todayDietLogs;
      } catch (error) {
        console.error("Error fetching today's diet logs:", error);
        throw new Error("Failed to fetch today's diet logs");
      }
    },
    
  },
  Mutation: {
    createDietLog: async (
      _: any,
      {
        userID,
        carbs,
        time_period,
        note,
        log_timestamp,
      }: {
        userID: string;
        carbs: number;
        time_period: string;
        note?: { note_title: string; note_description: string };
        log_timestamp: Date;
      }
    ): Promise<IDietLogs> => {
      try {
        const newDietLog = new DietLogs({
          userID,
          carbs,
          time_period,
          note: note ? { note_title: note.note_title, note_description: note.note_description } : undefined,
          log_timestamp,
        });
        return await newDietLog.save();
      } catch (error) {
        console.error("Error creating diet log:", error);
        throw new Error("Failed to create diet log");
      }
    },
    
    updateDietLog: async (
      _: any,
      { id, ...args }: { id: string } & Partial<IDietLogs>
    ): Promise<IDietLogs | null> => {
      try {
        const updatedLog = await DietLogs.findByIdAndUpdate(
          id,
          {
            ...args,
            note: args.note ? { title: args.note.note_title, content: args.note.note_description } : undefined,
          },
          { new: true }
        );
        return updatedLog;
      } catch (error) {
        console.error("Error updating diet log:", error);
        throw new Error("Failed to update diet log");
      }
    },
    deleteDietLog: async (_: any, { id }: { id: string }): Promise<string> => {
      try {
        await DietLogs.findByIdAndDelete(id);
        return "Diet Log deleted successfully";
      } catch (error) {
        console.error("Error deleting diet log:", error);
        throw new Error("Failed to delete diet log");
      }
    },
  },
};

export default dietLogsResolvers;
