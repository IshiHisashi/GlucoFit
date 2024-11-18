// resolvers/notificationResolvers.ts
import { Notification, INotification } from "../../model/Notification";
import { User } from "../../model/User";

const notificationResolvers = {
  Query: {
    getUserNotifications: async (
      _: any,
      { user_id, unreadOnly }: { user_id: string; unreadOnly?: boolean }
    ): Promise<INotification[]> => {
      console.log("exe");
      const filter: any = { user_id };
      if (unreadOnly) filter.read = false;

      return await Notification.find(filter).sort({ createdAt: -1 }).exec();
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
      return await Notification.find({ user_id })
        .sort({ createdAt: -1 })
        .exec();
    },
  },
};

export default notificationResolvers;
