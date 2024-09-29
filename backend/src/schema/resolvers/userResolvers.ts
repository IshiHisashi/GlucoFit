import { User, IUser } from "../../model/User";

const userResolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: string }): Promise<IUser | null> => {
      return await User.findById(id);
    },
    getUsers: async (): Promise<IUser[]> => {
      return await User.find();
    },
  },
  Mutation: {
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
