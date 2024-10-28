import { User } from "../model/User";

export const updateUserBadgeById = async (
  userId: string,
  badgeId: string,
  achieved: boolean
): Promise<any> => {
  return await User.findOneAndUpdate(
    { _id: userId, "badges.badgeId": badgeId },
    { $set: { "badges.$.achieved": achieved } },
    { new: true }
  );
};
