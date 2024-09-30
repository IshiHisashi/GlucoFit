import { Badges, IBadges } from "../../model/Badges";

const badgesResolvers = {
  Query: {
    getBadge: async (_: any, { id }: { id: string }): Promise<IBadges | null> => {
      return await Badges.findById(id);
    },
    getBadges: async (): Promise<IBadges[]> => {
      return await Badges.find();
    },
  },
  Mutation: {
    createBadge: async (_: any, args: IBadges): Promise<IBadges> => {
      const newBadge = new Badges(args);
      return await newBadge.save();
    },
    updateBadge: async (
      _: any,
      { id, ...args }: { id: string } & Partial<IBadges>
    ): Promise<IBadges | null> => {
      return await Badges.findByIdAndUpdate(id, args, { new: true });
    },

    deleteBadge: async (_: any, { id }: { id: string }): Promise<string> => {
      await Badges.findByIdAndDelete(id);
      return "Badge deleted successfully";
    },
  },
};

export default badgesResolvers;
