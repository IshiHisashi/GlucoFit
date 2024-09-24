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
    createUser: async (
      _: any,
      {
        name,
      }: {
        name: string;
      }
    ): Promise<IUser> => {
      const newUser = new User({
        name,
      });
      return await newUser.save();
    },
    updateUser: async (
      _: any,
      {
        id,
        name,
      }: {
        id: string;
        name: string;
      }
    ): Promise<IUser | null> => {
      return await User.findByIdAndUpdate(id, { name }, { new: true });
    },
    deleteUser: async (_: any, { id }: { id: string }): Promise<string> => {
      await User.findByIdAndDelete(id);
      return "User deleted successfully";
    },
  },
};

export default userResolvers;
