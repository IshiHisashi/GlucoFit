import { User, IUser } from "../../model/User";
import { generateToken } from "../../auth/auth";
import { Badges } from "../../model/Badges";

const userResolvers = {
  Query: {
    getUser: async (
      _: any,
      { id }: { id: string }
      // { user }: any
    ): Promise<IUser | null> => {
      // if (!user) {
      //   throw new Error("You must be logged in to view this data");
      // }
      return await User.findById(id);
    },
    getUsers: async (): Promise<IUser[]> => {
      return await User.find();
    },
    getUserBadge: async (
      _: any,
      { id }: { id: string }
    ): Promise<IUser | null> => {
      // Populate the 'badgeId' reference inside 'badges'
      return await User.findById(id).populate({
        path: "badges.badgeId",
        model: Badges,
        select: "_id badge_name badge_desc",
      });
    },
  },
  Mutation: {
    signUp: async (_: any, { email, password }: any) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const newUser = new User({ email, password });
      await newUser.save();

      const token = generateToken(newUser._id.toString(), newUser.email);
      return { token, user: newUser };
    },

    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const validPassword = await user.comparePassword(password);
      if (!validPassword) throw new Error("Invalid password");

      const token = generateToken(user._id.toString(), user.email);
      return { token, user };
    },

    createUser: async (_: any, args: IUser): Promise<IUser> => {
      const newUser = new User(args);
      return await newUser.save();
    },
    updateUser: async (
      _: any,
      { id, ...args }: { id: string } & Partial<IUser>
    ): Promise<IUser | null> => {
      return await User.findByIdAndUpdate(id, args, { new: true });
    },

    deleteUser: async (_: any, { id }: { id: string }): Promise<string> => {
      await User.findByIdAndDelete(id);
      return "User deleted successfully";
    },
  },
};

export default userResolvers;
