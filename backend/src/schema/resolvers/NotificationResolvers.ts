// resolvers/notificationResolvers.ts
import { Notification, INotification } from "../../model/Notification";
import { User } from "../../model/User";
import mongoose from "mongoose";

const notificationResolvers = {
  Query: {
    getUserNotifications: async (
      _: any,
      { user_id, unreadOnly }: { user_id: string; unreadOnly?: boolean }
    ): Promise<INotification[]> => {
      const filter: any = { user_id };
      if (unreadOnly) filter.read = false;

      return await Notification.find(filter).sort({ createdAt: -1 }).exec();
    },
    hasUnreadNotification: async (
      _: any,
      { user_id }: { user_id: string }
    ): Promise<boolean> => {
      const userObjectId = new mongoose.Types.ObjectId(user_id);
      const count = await Notification.countDocuments({
        user_id: userObjectId,
        read: false,
      });
      return count > 0; // Return true if there are any unread notifications
    },
  },

  Mutation: {
    createNotification: async (
      _: any,
      {
        user_id,
        title,
        description,
        type,
      }: { user_id: string; title: string; description: string; type: string }
    ): Promise<INotification> => {
      const newNotification = new Notification({
        user_id,
        title,
        description,
        type,
      });
      return await newNotification.save();
    },

    markNotificationAsRead: async (
      _: any,
      { id }: { id: string }
    ): Promise<INotification | null> => {
      return await Notification.findByIdAndUpdate(
        id,
        { read: true },
        { new: true }
      );
    },

    markAllNotificationsAsRead: async (
      _: any,
      { user_id }: { user_id: string }
    ): Promise<INotification[]> => {
      await Notification.updateMany({ user_id, read: false }, { read: true });
      return await Notification.find({ user_id }).sort({ createdAt: -1 }).exec();
    },

    deleteNotification: async (
      _: any,
      { id }: { id: string }
    ): Promise<boolean> => {
      const notificationId = new mongoose.Types.ObjectId(id);
      const result = await Notification.findByIdAndDelete(notificationId);
      return !!result; // Return true if deletion was successful, false otherwise
    },
  },
};

export default notificationResolvers;
