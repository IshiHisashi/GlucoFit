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
