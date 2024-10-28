// streakService.ts (or utility file)

import { User } from "../../model/User";
import { TestResults } from "../../model/TestResults";
import moment from "moment-timezone";
import { Types } from "mongoose";

// Function to calculate streak of consecutive test results
export const calculateStreak = async (
  user_id: string,
  withThreshold: boolean
): Promise<number> => {
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

      if (diffFromToday === 0 || diffFromYesterday === 0) {
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
};

export const calculateStreakByTimeRange = async (
  user_id: string,
  startHour: number,
  endHour: number
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

    // Filter results by the specified time range
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

    // Calculate streak
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
};
