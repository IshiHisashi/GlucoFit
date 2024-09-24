// src/schema/resolvers/index.ts

import userResolvers from "./userResolvers";

const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

export default resolvers;
