// src/schema/resolvers/index.ts

import userResolvers from "./userResolvers";
import testResultsResolvers from "./testResultResolvers";

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...testResultsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...testResultsResolvers.Mutation,
  },
};

export default resolvers;
