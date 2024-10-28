import { ActivityLogs } from "../model/ActivityLogs";
import { Types } from "mongoose";
import moment from "moment-timezone";

// Function to calculate the streak of consecutive activity logs
export const calculateActivityStreak = async (
  user_id: string
): Promise<number> => {
  try {
    const activityLogs = await ActivityLogs.find({
      user_id: new Types.ObjectId(user_id),
    })
      .sort({ log_timestamp: 1 })
      .exec();

    if (!activityLogs.length) return 0;

    const days = new Set<string>();

    activityLogs.forEach((log) => {
      const utcDate = moment.utc(log.log_timestamp).format("YYYY-MM-DD");
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
      "Error calculating streak of consecutive activity logs:",
      error
    );
    throw new Error("Failed to calculate streak of consecutive activity logs");
  }
};
