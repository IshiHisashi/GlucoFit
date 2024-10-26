import { TestResults, ITestResults } from "../../model/TestResults";
import { Articles, IArticles } from "../../model/Articles";
import { ActivityLogs } from "../../model/ActivityLogs";
import { DietLogs } from "../../model/DietLogs";
import { MedicineLog, UserMedicineList } from "../../model/MedicineLog";
import { User } from "../../model/User";
import { format } from "date-fns";
import { Types } from "mongoose";
import moment from "moment-timezone";

// Day mapping to convert index to day
const dayMapping = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Helper function to check if the medicine log timestamp matches the user's medicine list timestamp
const checkMedicineLog = async (user_id: string) => {

  // Fetch the most recent medicine log for the user
  const latestMedicineLog = await MedicineLog.findOne({ user_id })
    .sort({ log_timestamp: -1 })
    .exec();

  if (!latestMedicineLog) {
    throw new Error("No medicine log found for this user");
  }

  // Extract the medicine_id from the latest medicine log
  const { medicine_id } = latestMedicineLog;

  if (!medicine_id) {
    throw new Error("No medicine_id found in the latest medicine log");
  }

  // Get the relevant medicine from UserMedicineList using the medicine_id
  const userMedicine = await UserMedicineList.findOne({
    _id: medicine_id, // Ensure we're querying the correct medicine ID
    user_id,          // Ensure it belongs to the correct user
  }).exec();

  if (!userMedicine) {
    throw new Error("No corresponding medicine found in the user's medicine list");
  }

  // Compare timestamps
  const userMedicineTime = userMedicine.log_timestamp.getTime();
  const latestMedicineLogTime = latestMedicineLog.log_timestamp.getTime();

  // Check if the timestamps are within 0.5 hours (30 minutes)
  const halfHourInMillis = 30 * 60 * 1000;
  return Math.abs(userMedicineTime - latestMedicineLogTime) <= halfHourInMillis;

};

// Helper function to get the previous BSL log for comparison
const getPreviousBSLLog = async (user_id: string) => {
  return await TestResults.findOne({ user_id })
    .sort({ log_timestamp: -1 })
    .exec();
};

// Helper function to fetch the last carb log
const getLastCarbLog = async (user_id: string) => {
  return await DietLogs.findOne({ userID: user_id })
    .sort({ log_timestamp: -1 })
    .exec();
};

// Helper function to calculate total weekly footsteps count
const getWeeklyFootstepsCount = async (user_id: string) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const now = new Date(); // Current time

  const activityLogs = await ActivityLogs.find({
    user_id,
    log_timestamp: { $gte: oneWeekAgo, $lte: now },
  });

  const totalFootsteps = activityLogs.reduce(
    (total, log) => total + log.footsteps,
    0
  );

  return totalFootsteps;
};

// Mapping diabetic_type from user to string representation for articles
const mapDiabetesType = (diabetesType: number): string => {
  switch (diabetesType) {
    case 1:
      return "Prediabetic";
    case 2:
      return "Type 2";
    default:
      throw new Error("Unknown diabetes type");
  }
};

// Helper function to get a random article
const getRandomArticle = async (
  genre: "Food" | "Wellness" | "Medication",
  diabetesType: number
): Promise<IArticles | null> => {
  const diabetesTypeString = mapDiabetesType(diabetesType);

  const articles = await Articles.find({
    article_genre: genre,
    diabetes_type: diabetesTypeString,
  }).exec();

  if (articles.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * articles.length);
  return articles[randomIndex];
};

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
      { user_id, withThreshold }: { user_id: string; withThreshold: boolean }
    ): Promise<number> => {
      try {
        let testResults;

        // Fetch test results for the user
        if (withThreshold) {
          const user = await User.findById(user_id);
          if (!user) {
            throw new Error("User not found");
          }
          const { maximum_bsl, minimum_bsl } = user;

          testResults = await TestResults.find({
            user_id: new Types.ObjectId(user_id),
            bsl: { $gte: minimum_bsl, $lte: maximum_bsl },
          })
            .sort({ log_timestamp: 1 })
            .exec();
        } else {
          testResults = await TestResults.find({
            user_id: new Types.ObjectId(user_id),
          })
            .sort({ log_timestamp: 1 })
            .exec();
        }

        if (!testResults.length) return 0;

        const days = new Set<string>();

        testResults.forEach((result) => {
          const utcDate = moment.utc(result.log_timestamp).format("YYYY-MM-DD");
          days.add(utcDate);
        });

        const uniqueDays = Array.from(days).sort();
        const today = moment.tz("America/Vancouver").startOf("day");
        const yesterday = moment
          .tz("America/Vancouver")
          .subtract(1, "days")
          .startOf("day");

        let streak = 0;
        let currentStreak = 0;

        for (let i = uniqueDays.length - 1; i >= 0; i--) {
          const currentDay = moment.utc(uniqueDays[i], "YYYY-MM-DD");

          if (i === uniqueDays.length - 1) {
            const diffFromToday = today.diff(currentDay, "days");
            const diffFromYesterday = yesterday.diff(currentDay, "days");

            console.log(
              `Checking first log day (UTC): ${uniqueDays[i]} (diffFromToday: ${diffFromToday}, diffFromYesterday: ${diffFromYesterday})`
            );

            if (diffFromToday === 0) {
              currentStreak = 1;
            } else if (diffFromYesterday === 0) {
              currentStreak = 1;
            } else {
              return 0;
            }
          } else {
            const prevDay = moment.utc(uniqueDays[i + 1], "YYYY-MM-DD");
            const diff = prevDay.diff(currentDay, "days");

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

    getStreakByTimeRange: async (
      _: any,
      {
        user_id,
        startHour,
        endHour,
      }: { user_id: string; startHour: number; endHour: number }
    ): Promise<number> => {
      try {
        // Fetch all test results for the user, sorted by timestamp
        const testResults = await TestResults.find({
          user_id: new Types.ObjectId(user_id),
        })
          .sort({ log_timestamp: 1 })
          .exec();

        if (!testResults.length) return 0;

        const days = new Set<string>();
        testResults.forEach((result) => {
          const logTime = moment.utc(result.log_timestamp);
          const utcHour = logTime.hour();
          const utcDate = logTime.format("YYYY-MM-DD");

          if (utcHour >= startHour && utcHour < endHour) {
            days.add(utcDate);
          }
        });

        const uniqueDays = Array.from(days).sort();

        if (!uniqueDays.length) return 0;

        let streak = 0;
        let currentStreak = 0;

        for (let i = uniqueDays.length - 1; i >= 0; i--) {
          const currentDay = moment(uniqueDays[i], "YYYY-MM-DD");
          const prevDay = moment(uniqueDays[i + 1], "YYYY-MM-DD");

          if (i === uniqueDays.length - 1) {
            currentStreak = 1;
          } else {
            const diff = prevDay.diff(currentDay, "days");
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
        console.error("Error calculating streak by time range:", error);
        throw new Error("Failed to calculate streak by time range");
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
    createTestResultWithInsights: async (
      _: any,
      args: ITestResults
    ): Promise<IArticles[]> => {
      try {
        const newTestResult = new TestResults(args);
        await newTestResult.save();

        // Fetch the user's diabetic type and BSL data from the User model
        const user = await User.findById(args.user_id);
        if (!user) {
          throw new Error("User not found");
        }

        const diabetesType = user.diabates_type;
        const maxBSL = user.maximum_bsl;
        const minBSL = user.minimum_bsl;
        const averageBSL = (maxBSL + minBSL) / 2;

        // Fetch the previous BSL log
        const previousBSLLog = await getPreviousBSLLog(args.user_id.toString());

        const articlesToShow: IArticles[] = []; // Always an array of IArticles


        // Use the actual medicine_id from the latest medicine log and pass it to the checkMedicineLog function
        const medicineCheck = await checkMedicineLog(user_id); // Pass the ObjectId as a string

        // Check if BSL is different from previous log or exceeds average BSL
        const bslCheck = !previousBSLLog || bsl > previousBSLLog.bsl || bsl > averageBSL;

      // If bslCheck is false, proceed with further checks
    if (!bslCheck) {
      // If medicine log check fails, fetch a medication article
      if (!medicineCheck) {
        const medicationArticle = await getRandomArticle("Medication", diabetesType);
        if (medicationArticle) {
          // Add article to articlesToShow array
          articlesToShow.push(medicationArticle);

          // Add article ID to user's recently_read_articles_array if not already present
          if (!user.recently_read_articles_array.includes(medicationArticle._id)) {
            user.recently_read_articles_array.push(medicationArticle._id);
            await user.save(); // Save the user document with updated article array
          }

        }
      }

      // Fetch the latest carb log and check if carbs are above 45g
      const lastCarbLog = await getLastCarbLog(user_id);
      if (lastCarbLog && lastCarbLog.carbs > 45) {
        // If carbs are higher than 45g, pop up a "Food" article
        const foodArticle = await getRandomArticle("Food", diabetesType);
        if (foodArticle) {
          // Add article to articlesToShow array
          articlesToShow.push(foodArticle);

          // Add article ID to user's recently_read_articles_array if not already present
          if (!user.recently_read_articles_array.includes(foodArticle._id)) {
            user.recently_read_articles_array.push(foodArticle._id);
            await user.save();
          }
        }
      }

      // Check total footsteps for the past week (below 150)
      const totalFootsteps = await getWeeklyFootstepsCount(user_id);
      if (totalFootsteps < 150) {
        const wellnessArticle = await getRandomArticle("Wellness", diabetesType);
        if (wellnessArticle) {
          // Add article to articlesToShow array
          articlesToShow.push(wellnessArticle);

          // Add article ID to user's recently_read_articles_array if not already present
          if (!user.recently_read_articles_array.includes(wellnessArticle._id)) {
            user.recently_read_articles_array.push(wellnessArticle._id);
            await user.save();
          }
        }
      }
    }
        // Return the list of articles to show (empty array if no articles are found)
        return articlesToShow;
      } catch (error) {
        console.error("Error creating test result:", error);
        throw new Error("Failed to create test result and fetch insights");
      }
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
