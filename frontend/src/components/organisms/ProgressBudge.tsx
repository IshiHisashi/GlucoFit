import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  HStack,
  Icon,
  ChevronRightIcon,
  ScrollView,
} from "@gluestack-ui/themed";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  GET_USER_ON_PROGRESS_BADGES,
  QUERY_FOR_STREAK_STARTER,
  QUERY_FOR_STREAK_BY_TIME_RANGE,
  QUERY_FOR_STREAK_ACTIVITYLOGS,
  GET_NUM_FAVORITE_ARTICLE,
} from "../../utils/query/badgeProgressQuery";

const userId = "670db268582e7e887e447288";

const ProgressBudgeSection: React.FC = () => {
  //-------------- TO AKI FROM ISHI ------------
  // Conditional fetching is done in the following idea.
  // 1) Fetch unachieved badges initially.
  // 2) Then, depending on the result, the necessary functions are executed to show corresponding progress. This is done by 'useLazyQuery'
  // 3) So, LazyQueries are defined
  // 4) Define (map) badge name with these lazyqueries.
  // 5) Define (map) badge name with the retrieved data (number as progress).

  // Remaining task to hand over.
  // - image needs to be dynamic
  // - badge description should be added
  // - fetch optimization (if any)

  // 1).Fetch user badges using useQuery
  const { loading, error, data } = useQuery(GET_USER_ON_PROGRESS_BADGES, {
    variables: { id: userId },
  });

  // 2). 3). Lazy Queries for each badge progress
  const [loadStreakData, { data: streakData }] = useLazyQuery(
    QUERY_FOR_STREAK_STARTER,
    { variables: { userId, withThreshold: false } }
  );
  const [loadStreakBslRangeData, { data: streakBslRangeData }] = useLazyQuery(
    QUERY_FOR_STREAK_STARTER,
    { variables: { userId, withThreshold: true } }
  );
  const [loadStreakEarlyBirdData, { data: streakEarlyBirdData }] = useLazyQuery(
    QUERY_FOR_STREAK_BY_TIME_RANGE,
    { variables: { userId, startHour: 6, endHour: 8 } }
  );
  const [loadStreakNightOwlData, { data: streakNightOwlData }] = useLazyQuery(
    QUERY_FOR_STREAK_BY_TIME_RANGE,
    { variables: { userId, startHour: 20, endHour: 24 } }
  );
  const [loadStreakActivityLogslData, { data: streakActivityLogsData }] =
    useLazyQuery(QUERY_FOR_STREAK_ACTIVITYLOGS, { variables: { userId } });
  const [loadNumArticleData, { data: numArticleData }] = useLazyQuery(
    GET_NUM_FAVORITE_ARTICLE,
    { variables: { id: userId } }
  );

  // 4). Map badge names to their respective loaders
  const badgeLoaders: Record<string, () => void> = {
    "First Steps": loadStreakData,
    "Streak Starter": loadStreakData,
    "Healthy Habit": loadStreakBslRangeData,
    "Early Bird": loadStreakEarlyBirdData,
    "Night Owl": loadStreakNightOwlData,
    "Glucose Guru": loadStreakBslRangeData,
    "Check-in Champion": loadStreakData,
    "Fitness Streak": loadStreakActivityLogslData,
    "Knowledge Seeker": loadNumArticleData,
  };

  // 4). Effect to Load Badge-Specific Data
  useEffect(() => {
    if (data?.getUserOnProgressBadge?.badges) {
      data.getUserOnProgressBadge.badges.forEach((badge: any) => {
        const loadBadgeData = badgeLoaders[badge.badgeId.badge_name];
        if (loadBadgeData) loadBadgeData();
      });
    }
  }, [data]);

  // 5). Helper function to get the appropriate data for the badge
  const getBadgeProgress = (badgeName: string) => {
    switch (badgeName) {
      case "First Steps":
      case "Streak Starter":
      case "Check-in Champion":
        return JSON.stringify(streakData?.getStreakTestResults);
      case "Healthy Habit":
      case "Glucose Guru":
        return JSON.stringify(streakBslRangeData?.getStreakTestResults);
      case "Early Bird":
        return JSON.stringify(streakEarlyBirdData?.getStreakByTimeRange);
      case "Night Owl":
        return JSON.stringify(streakNightOwlData?.getStreakByTimeRange);
      case "Fitness Streak":
        return JSON.stringify(streakActivityLogsData?.getStreakActivityLogs);
      case "Knowledge Seeker":
        return JSON.stringify(
          numArticleData?.getUser.favourite_articles?.length
        );
      default:
        return "tbc";
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View
      flexDirection="column"
      gap={20}
      borderColor="#ccc"
      borderWidth={1}
      rounded={10}
      padding={10}
    >
      {/* Section header */}
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize={20} fontWeight="$semibold">
          Progress
        </Text>
        <Pressable>
          <HStack alignItems="center" space="xs">
            <Text>See more</Text>
            <Icon as={ChevronRightIcon} size="sm" mr="$2" />
          </HStack>
        </Pressable>
      </View>

      {/* Render Badge Cards */}
      <ScrollView height={250}>
        {data?.getUserOnProgressBadge?.badges.map((badge: any) => (
          <View
            key={badge.badgeId.id}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            borderColor="#ddd"
            borderBottomWidth={1}
            p={12}
          >
            <View flexDirection="row" gap={8} alignItems="center">
              {/* NEED TO BE REPLACED CONDITIONALLY */}
              <Image
                source={require("../../../assets/badges/knowledgeSeeker.png")}
                alt="Local Image"
                w={40}
                h={40}
              />
              <View>
                <Text>{badge.badgeId.badge_name}</Text>
                <Text fontSize={10}>badge description</Text>
              </View>
            </View>
            <Text>
              {getBadgeProgress(badge.badgeId.badge_name)} /{" "}
              {badge.badgeId.criteria.value}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const ProgressBudge: React.FC = () => {
  return <ProgressBudgeSection />;
};

export default ProgressBudge;
