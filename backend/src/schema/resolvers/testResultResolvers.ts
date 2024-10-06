import { TestResults, ITestResults } from "../../model/TestResults";
import { Types, ObjectId } from "mongoose";

const testResultsResolvers = {
  Query: {
    getTestResult: async (
      _: any,
      { id }: { id: string }
    ): Promise<ITestResults | null> => {
      return await TestResults.findById(id);
    },
    getTestResults: async (): Promise<ITestResults[]> => {
      return await TestResults.find();
    },
    getTestResultsByUser: async (_: any, { user_id }: { user_id: string }) => {
      return await TestResults.find({ user_id }).populate("user_id");
    },

    getAverageBslForToday: async (_: any, { user_id }: { user_id: string }): Promise<number | null> => {
      try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0); 

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999); 

        const result = await TestResults.aggregate([
          {
            $match: {
              user_id: new Types.ObjectId(user_id),  
              log_timestamp: { $gte: startOfDay, $lte: endOfDay },  
            },
          },
          {
            $group: {
              _id: null,  
              averageBsl: { $avg: "$bsl" },
            },
          },
        ]);

        if (result.length === 0) {
          return null;
        }

        return result[0].averageBsl;
      } catch (error) {
        console.error("Error calculating average BSL for today:", error);
        throw new Error("Failed to calculate average BSL for today");
      }
    },
  },
  Mutation: {
    createTestResult: async (
      _: any,
      args: ITestResults
    ): Promise<ITestResults> => {
      const newTestResult = new TestResults(args);
      return (await newTestResult.save()).populate("user_id");
    },
    updateTestResult: async (
      _: any,
      { id, ...args }: { id: string } & Partial<ITestResults>
    ): Promise<ITestResults | null> => {
      return await TestResults.findByIdAndUpdate(id, args, { new: true });
    },

    deleteTestResult: async (
      _: any,
      { id }: { id: string }
    ): Promise<string> => {
      await TestResults.findByIdAndDelete(id);
      return "TestResult deleted successfully";
    },
  },
};

export default testResultsResolvers;
