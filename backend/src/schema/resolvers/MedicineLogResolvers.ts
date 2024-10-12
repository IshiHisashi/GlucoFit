import { MedicineLog, IMedicineLog } from "../../model/MedicineLog";
import { Types, ObjectId } from "mongoose";

const medicineLogResolvers = {
  Query: {
    getMedicineLog: async (
      _: any,
      { id }: { id: string }
    ): Promise<IMedicineLog | null> => {
      return await MedicineLog.findById(id);
    },
    getMedicineLogs: async (): Promise<IMedicineLog[]> => {
      return await MedicineLog.find();
    },
    getMedicineLogsByUser: async (_: any, { user_id }: { user_id: string }) => {
      return await MedicineLog.find({ user_id }).populate("user_id");
    },
   // Get today's medicine logs for a specific user
   getTodayMedicineLogs: async (_: any, { user_id }: { user_id: string }): Promise<IMedicineLog[]> => {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0); // Start of today

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // End of today

      // Fetch all medicine logs for today
      return await MedicineLog.find({
        user_id: new Types.ObjectId(user_id),
        log_timestamp: { $gte: startOfDay, $lte: endOfDay },
      });
    } catch (error) {
      console.error("Error fetching today's medicine logs:", error);
      throw new Error("Failed to fetch today's medicine logs");
    }
  },
    
  },
  Mutation: {
    createMedicineLog: async (
      _: any,
      args: IMedicineLog
    ): Promise<IMedicineLog> => {
      const newMedicineLog = new MedicineLog(args);
      return (await newMedicineLog.save()).populate("user_id");
    },
    updateMedicineLog: async (
      _: any,
      { id, ...args }: { id: string } & Partial<IMedicineLog>
    ): Promise<IMedicineLog | null> => {
      return await MedicineLog.findByIdAndUpdate(id, args, { new: true });
    },

    deleteMedicineLog: async (
      _: any,
      { id }: { id: string }
    ): Promise<string> => {
      await MedicineLog.findByIdAndDelete(id);
      return "MedicineLog deleted successfully";
    },
  },
};

export default medicineLogResolvers;
