import { TestResults, ITestResults } from "../../model/TestResults";
import { User } from "../../model/User";
import { Types, ObjectId } from "mongoose";
import { format } from "date-fns";

// Day mapping to convert index to day
const dayMapping = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
    getUnconfirmedTestResults: async (
      _: any,
      { user_id }: { user_id: string }
    ): Promise<ITestResults[]> => {
      try {
        const unconfirmedResults = await TestResults.find({
          user_id,
          confirmed: false,
        });
        return unconfirmedResults;
      } catch (error) {
        console.error(
          "Error fetching unconfirmed test results for user:",
          error
        );
        throw new Error(
          "Failed to fetch unconfirmed test results for the user"
        );
      }
    },
    getTestResultsAndAverageForToday: async (
      _: any,
      { user_id }: { user_id: string }
    ): Promise<{ testResults: ITestResults[]; averageBsl: number | null }> => {
      try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0); // Start of today

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999); // End of today

        // Fetch all test results for today
        const testResults = await TestResults.find({
          user_id: new Types.ObjectId(user_id),
          log_timestamp: { $gte: startOfDay, $lte: endOfDay },
        });

        // Calculate average BSL
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

        const averageBsl =
          result.length > 0
            ? parseFloat(result[0].averageBsl.toFixed(1))
            : null;

        return { testResults, averageBsl };
      } catch (error) {
        console.error(
          "Error fetching test results and average BSL for today:",
          error
        );
        throw new Error(
          "Failed to fetch test results and average BSL for today"
        );
      }
    },
    getWeeklyBSLData: async (_: any, { user_id }: { user_id: string }) => {
      try {
        // Fetch the user and retrieve their create_day
        const user = await User.findById(user_id);
        if (!user || !user.create_day) {
          throw new Error("User not found or create_day is missing");
        }

        // Get the user's create day
        const startDayIndex = dayMapping.indexOf(user.create_day);
        if (startDayIndex === -1) {
          throw new Error("Invalid create_day");
        }

        // Get current date and calculate the start and end of the week
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();
        const dayDifference = (currentDayIndex - startDayIndex + 7) % 7;

        const startOfWeek = new Date();
        startOfWeek.setDate(currentDate.getDate() - dayDifference);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week
        endOfWeek.setHours(23, 59, 59, 999);

        // Fetch BSL test results for this week
        const results = await TestResults.aggregate([
          {
            $match: {
              user_id: new Types.ObjectId(user_id),
              log_timestamp: { $gte: startOfWeek, $lte: endOfWeek },
            },
          },
          {
            $addFields: {
              localTimestamp: {
                $dateToString: {
                  format: "%Y-%m-%dT%H:%M:%S",
                  date: "$log_timestamp",
                  timezone: "America/Vancouver", // <-- Set the timezone to Vancouver
                },
              },
            },
          },

          {
            $group: {
              _id: { $dayOfWeek: { $toDate: "$localTimestamp" } }, // <-- Adjust to local time
              averageBsl: { $avg: "$bsl" },
            },
          },
        ]);

        // Map results based on day of the week
        const resultMap = new Map<number, number>();
        results.forEach((dayData) => {
          // Convert MongoDB $dayOfWeek (1 = Sunday) to JS getDay() (0 = Sunday)
          const dayIndex = dayData._id % 7; // Convert to match day index (Sun = 0, Mon = 1, etc.)
          resultMap.set(
            dayIndex - 1,
            parseFloat(dayData.averageBsl.toFixed(1))
          );
        });

        // Prepare the weekly data with defaults for missing days
        const formattedData = [];
        for (let i = 0; i < 7; i++) {
          const dayIndex = (startDayIndex + i) % 7;
          formattedData.push({
            day: dayMapping[dayIndex], // Day of the week
            value: resultMap.get(dayIndex) || 0, // Default to 0 if no data
          });
        }

        // Calculate the weekly average
        const totalBSL = results.reduce(
          (acc, curr) => acc + curr.averageBsl,
          0
        );
        const weeklyAverage =
          results.length > 0
            ? parseFloat((totalBSL / results.length).toFixed(1))
            : 0; // Round to 1 decimal

               // Format the start and end dates in the format: "Sep 24 - Oct 30, 2024"
    const formattedStartDate = format(startOfWeek, "MMM dd");
    const formattedEndDate = format(endOfWeek, "MMM dd, yyyy");

    const dateRange = `${formattedStartDate} - ${formattedEndDate}`;


        return {
          weeklyData: formattedData,
          weeklyAverage,
          dateRange,
        };
      } catch (error) {
        console.error("Error fetching weekly BSL data:", error);
        throw new Error("Failed to fetch weekly BSL data");
      }
    },
    getAverageBslXAxisValue: async (
      _: any,
      { user_id }: { user_id: string }
    ) => {
      try {
        const user = await User.findById(user_id);
        if (!user) {
          throw new Error("User not found");
        }

        const { maximum_bsl, minimum_bsl } = user;

        if (maximum_bsl === undefined || minimum_bsl === undefined) {
          throw new Error("User's BSL values are not defined");
        }

        const averageBslXAxisValue = parseFloat(
          ((maximum_bsl + minimum_bsl) / 2).toFixed(1)
        );

        return averageBslXAxisValue;
      } catch (error) {
        console.error("Error calculating average BSL X Axis value:", error);
        throw new Error("Failed to calculate average BSL X Axis value");
      }
    },
    // For Gamification
    getStreakTestResults: async (
      _: any,
      { user_id }: { user_id: string }
    ): Promise<number> => {
      try {
        const testResults = await TestResults.find({
          user_id: new Types.ObjectId(user_id),
        })
          .sort({ log_timestamp: 1 })
          .exec();
        if (!testResults.length) return 0;

        // Group by day (only keeping the date part)
        const days = new Set<string>();
        testResults.forEach((result) => {
          const date = result.log_timestamp.toISOString().split("T")[0];
          days.add(date);
        });

        const uniqueDays = Array.from(days).sort();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let streak = 0;
        let currentStreak = 0;

        for (let i = uniqueDays.length - 1; i >= 0; i--) {
          const currentDay = new Date(uniqueDays[i]);

          // Check if there's a gap from today
          if (i === uniqueDays.length - 1) {
            const diffFromToday =
              (today.getTime() - currentDay.getTime()) / (1000 * 60 * 60 * 24);
            if (diffFromToday > 0) {
              return 0;
            } else {
              currentStreak = 1;
            }
          } else {
            const prevDay = new Date(uniqueDays[i + 1]);
            const diff =
              (prevDay.getTime() - currentDay.getTime()) /
              (1000 * 60 * 60 * 24);
            if (diff === 1) {
              currentStreak++;
            } else {
              break;
            }
          }
          streak = Math.max(streak, currentStreak);
        }

        return streak;
      } catch (error) {
        console.error(
          "Error calculating streak of consecutive test results:",
          error
        );
        throw new Error(
          "Failed to calculate streak of consecutive test results"
        );
      }
    },
    getTestResultsDatesByMonth: async (
      _: any,
      { user_id, year, month }: { user_id: string; year: number; month: number }
    ): Promise<string[]> => {
      try {
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
        // Query the test results for the user for the given month
        const testResults = await TestResults.find({
          user_id: new Types.ObjectId(user_id),
          log_timestamp: { $gte: startOfMonth, $lte: endOfMonth },
        }).sort({ log_timestamp: 1 });
        // Extract unique dates
        const loggedDates = new Set<string>();
        testResults.forEach((result) => {
          const dateOnly = result.log_timestamp.toISOString().split("T")[0];
          loggedDates.add(dateOnly);
        });

        return Array.from(loggedDates);
      } catch (error) {
        console.error("Error fetching test result dates:", error);
        throw new Error("Failed to fetch test result dates");
      }
    },
    getTestResultsLast7Days: async (
      _: any,
      { user_id }: { user_id: string }
    ): Promise<string[]> => {
      try {
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);
        const testResults = await TestResults.find({
          user_id: new Types.ObjectId(user_id),
          log_timestamp: { $gte: sevenDaysAgo, $lte: today },
        }).sort({ log_timestamp: 1 });
        const loggedDates = new Set<string>();
        testResults.forEach((result) => {
          const dateOnly = result.log_timestamp.toISOString().split("T")[0]; // Keep only the date part
          loggedDates.add(dateOnly);
        });

        return Array.from(loggedDates);
      } catch (error) {
        console.error(
          "Error fetching test results for the last 7 days:",
          error
        );
        throw new Error("Failed to fetch test results for the last 7 days");
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
