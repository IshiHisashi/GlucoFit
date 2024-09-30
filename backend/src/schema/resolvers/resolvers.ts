// src/schema/resolvers/index.ts

import userResolvers from "./userResolvers";
import testResultsResolvers from "./testResultResolvers";
import activityLogsResolvers from "./ActivityLogsResolvers";
import insulinLogResolvers from "./InsulinLogResolvers";
import badgesResolvers from "./BadgesResolvers";
import articlesResolvers from "./ArticlesResolvers";

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...testResultsResolvers.Query,
    ...activityLogsResolvers.Query,
    ...insulinLogResolvers.Query,
    ...badgesResolvers.Query,
    ...articlesResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...testResultsResolvers.Mutation,
    ...activityLogsResolvers.Mutation,
    ...insulinLogResolvers.Mutation,
    ...badgesResolvers.Mutation,
    ...articlesResolvers.Mutation
  },
};

export default resolvers;
