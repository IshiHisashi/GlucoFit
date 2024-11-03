import { MedicineLog, IMedicineLog } from "../../model/MedicineLog";
import { UserMedicineList } from "../../model/MedicineLog"; // Import the UserMedicineList
import { Types } from "mongoose";

const medicineLogResolvers = {
  Query: {
    getMedicineLog: async (
      _: any,
      { id }: { id: string }
    ): Promise<IMedicineLog | null> => {
      return await MedicineLog.findById(id).populate("medicine_id user_id");
    },
    getMedicineLogs: async (): Promise<IMedicineLog[]> => {
      return await MedicineLog.find().populate("medicine_id user_id");
    },
    getMedicineLogsByUser: async (_: any, { user_id }: { user_id: string }) => {
      try {
        // Find all medicine logs for the given user_id and populate the referenced fields
        const medicineLogs = await MedicineLog.find({ user_id })
          .populate({
            path: "medicine_id", // Populate the medicine details
            model: "UserMedicineList", // Make sure this is the correct model name
          })
          .populate("user_id") // Populate user details if needed
          .exec();

        // Check for any logs that have a null medicine_id
        if (medicineLogs.some((log) => log.medicine_id === null)) {
          throw new Error(
            "Some medicine logs have an invalid or missing medicine_id reference."
          );
        }

        return medicineLogs;
      } catch (error) {
        console.error("Error fetching medicine logs for user:", error);
        throw new Error(
          "Failed to fetch medicine logs. Please check if all references are correct."
        );
      }
    },
    // New query to get all medicines in the user's list
    getUserMedicineList: async (_: any, { user_id }: { user_id: string }) => {
      try {
        // Fetch all medicines from the user's personal list
        const userMedicineList = await UserMedicineList.find({
          user_id: new Types.ObjectId(user_id),
        });

        if (!userMedicineList.length) {
          throw new Error("No medicines found in the user's list.");
        }

        return userMedicineList;
      } catch (error) {
        console.error("Error fetching the user's medicine list:", error);
        throw new Error("Failed to fetch the user's medicine list");
      }
    },
    // Get today's medicine logs for a specific user
    getTodayMedicineLogs: async (
      _: any,
      { user_id }: { user_id: string }
    ): Promise<IMedicineLog[]> => {
      try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0); // Start of today

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999); // End of today

        // Fetch all medicine logs for today
        return await MedicineLog.find({
          user_id: new Types.ObjectId(user_id),
          log_timestamp: { $gte: startOfDay, $lte: endOfDay },
        }).populate("medicine_id user_id");
      } catch (error) {
        console.error("Error fetching today's medicine logs:", error);
        throw new Error("Failed to fetch today's medicine logs");
      }
    },
  },
  Mutation: {
    // Add a new medicine to the user's personal list
    addMedicineToList: async (
      _: any,
      {
        user_id,
        medicine_name,
        dosage,
        unit,
        log_timestamp,
      }: {
        user_id: string;
        medicine_name: string;
        dosage?: string;
        unit?: string;
        log_timestamp?: Date;
      }
    ) => {
      try {
        const newMedicine = new UserMedicineList({
          user_id: new Types.ObjectId(user_id), // Convert to ObjectId
          medicine_name,
          dosage,
          unit,
          log_timestamp,
        });

        return await newMedicine.save();
      } catch (error) {
        console.error("Error adding medicine to list:", error);
        throw new Error("Failed to add medicine to list");
      }
    },

    createMedicineLog: async (
      _: any,
      {
        user_id,
        medicine_id,
        amount,
        log_timestamp,
      }: {
        user_id: string;
        medicine_id: string;
        amount: number;
        log_timestamp: Date;
      }
    ) => {
      // Validate if medicine_id exists in UserMedicineList
      const medicine = await UserMedicineList.findById(medicine_id);
      if (!medicine) {
        throw new Error(
          "Invalid medicine_id: No matching medicine found in UserMedicineList."
        );
      }

      const newMedicineLog = new MedicineLog({
        user_id: new Types.ObjectId(user_id),
        medicine_id: new Types.ObjectId(medicine_id),
        amount,
        log_timestamp,
      });

      // Save the newMedicineLog first and then populate it
      const savedLog = await newMedicineLog.save(); // Wait for save to complete
      return await savedLog.populate("medicine_id user_id"); // Populate after save
    },

    updateMedicineLog: async (
      _: any,
      { id, ...args }: { id: string } & Partial<IMedicineLog>
    ): Promise<IMedicineLog | null> => {
      return await MedicineLog.findByIdAndUpdate(id, args, {
        new: true,
      }).populate("medicine_id user_id");
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
