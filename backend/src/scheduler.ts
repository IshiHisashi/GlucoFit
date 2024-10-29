// scheduler.ts
import cron from "node-cron";
import { Notification } from "./model/Notification";
import { User } from "./model/User";

// Function to create a daily notification for each user at 5 AM
const sendDailyLogReminder = async () => {
  try {
    // Fetch all users
    const users = await User.find();

    for (const user of users) {
      // Check if a notification for today already exists
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today

      const existingNotification = await Notification.findOne({
        user_id: user._id,
        title: "Daily Log Reminder",
        createdAt: { $gte: today },
      });

      // If there's no reminder for today, create one
      if (!existingNotification) {
        const newNotification = new Notification({
          user_id: user._id,
          title: "Daily Log Reminder",
          description: "Don’t forget to log today",
          type: "reminder",
          createdAt: new Date(),
        });

        await newNotification.save();
      }
    }

    console.log("Daily log reminder notifications created successfully.");
  } catch (error) {
    console.error("Error sending daily log reminders:", error);
  }
};

// Schedule the task to run at 5 AM every day
cron.schedule("0 5 * * *", sendDailyLogReminder, {
  timezone: "America/Vancouver", // Adjust timezone as needed
});

export default sendDailyLogReminder;
