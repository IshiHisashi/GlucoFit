// src/schema/resolvers/index.ts
import userResolvers from "./userResolvers";
import testResultsResolvers from "./testResultResolvers";
import activityLogsResolvers from "./ActivityLogsResolvers";
import medicineLogResolvers from "./MedicineLogResolvers";
import badgesResolvers from "./BadgesResolvers";
import articlesResolvers from "./ArticlesResolvers";
import dietLogsResolvers from "./DietLogsResolvers";
import logsForHistoryScreenResolvers from "./logsForHistoryScreenResolvers";
import notificationResolvers from "./NotificationResolvers";

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...testResultsResolvers.Query,
    ...activityLogsResolvers.Query,
    ...medicineLogResolvers.Query,
    ...badgesResolvers.Query,
    ...articlesResolvers.Query,
    ...dietLogsResolvers.Query,
    ...logsForHistoryScreenResolvers.Query,
    ...notificationResolvers.Query

  },
  Mutation: {
    ...userResolvers.Mutation,
    ...testResultsResolvers.Mutation,
    ...activityLogsResolvers.Mutation,
    ...medicineLogResolvers.Mutation,
    ...badgesResolvers.Mutation,
    ...articlesResolvers.Mutation,
    ...dietLogsResolvers.Mutation,
    ...notificationResolvers.Mutation,
  },
};

export default resolvers;
