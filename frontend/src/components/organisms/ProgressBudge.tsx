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
  // Fetch user badges using useQuery
  const { loading, error, data } = useQuery(GET_USER_ON_PROGRESS_BADGES, {
    variables: { id: userId },
  });

  // -------------------------
  // FETCH DATA TO SEE PROGRESS OF EACH BADGE
  const [loadStreakData, { data: streakData }] = useLazyQuery(
    QUERY_FOR_STREAK_STARTER,
    {
      variables: {
        userId: userId,
        withThreshold: false,
      },
    }
  );
  const [loadStreakBslRangeData, { data: streakBslRangeData }] = useLazyQuery(
    QUERY_FOR_STREAK_STARTER,
    {
      variables: {
        userId: userId,
        withThreshold: true,
      },
    }
  );
  const [loadStreakEarlyBirdData, { data: streakEarlyBirdData }] = useLazyQuery(
    QUERY_FOR_STREAK_BY_TIME_RANGE,
    {
      variables: { userId: userId, startHour: 6, endHour: 8 },
    }
  );
  const [loadStreakNightOwlData, { data: streakNightOwlData }] = useLazyQuery(
    QUERY_FOR_STREAK_BY_TIME_RANGE,
    {
      variables: { userId: userId, startHour: 20, endHour: 24 },
    }
  );
  const [loadStreakActivityLogslData, { data: streakActivityLogsData }] =
    useLazyQuery(QUERY_FOR_STREAK_ACTIVITYLOGS, {
      variables: { userId: userId },
    });
  const [loadNumArticleData, { data: numArticleData }] = useLazyQuery(
    GET_NUM_FAVORITE_ARTICLE,
    {
      variables: { id: userId },
    }
  );

  // Effect to Load Badge-Specific Data
  useEffect(() => {
    if (data?.getUserOnProgressBadge?.badges) {
      data.getUserOnProgressBadge.badges.forEach((badge: any) => {
        if (badge.badgeId.badge_name === "First Steps") {
          loadStreakData();
        } else if (badge.badgeId.badge_name === "Streak Starter") {
          loadStreakData();
        } else if (badge.badgeId.badge_name === "Healthy Habit") {
          loadStreakBslRangeData();
        } else if (badge.badgeId.badge_name === "Early Bird") {
          loadStreakEarlyBirdData();
        } else if (badge.badgeId.badge_name === "Night Owl") {
          loadStreakNightOwlData();
        } else if (badge.badgeId.badge_name === "Glucose Guru") {
          loadStreakBslRangeData();
        } else if (badge.badgeId.badge_name === "Check-in Champion") {
          loadStreakData();
        } else if (badge.badgeId.badge_name === "Fitness Streak") {
          loadStreakActivityLogslData();
        } else if (badge.badgeId.badge_name === "Knowledge Seeker") {
          loadNumArticleData();
        }
      });
    }
  }, [data]);
  // ---------------------------

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
            p={8}
          >
            <View flexDirection="row" gap={8} alignItems="center">
              {/* Please add conditional image rendering later */}
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
              {/* Need conditional rendering depending on badge name */}
              {badge.badgeId.badge_name === "First Steps"
                ? JSON.stringify(streakData?.getStreakTestResults)
                : badge.badgeId.badge_name === "Streak Starter"
                  ? JSON.stringify(streakData?.getStreakTestResults)
                  : badge.badgeId.badge_name === "Healthy Habit"
                    ? JSON.stringify(streakBslRangeData?.getStreakTestResults)
                    : badge.badgeId.badge_name === "Early Bird"
                      ? JSON.stringify(
                          streakEarlyBirdData?.getStreakByTimeRange
                        )
                      : badge.badgeId.badge_name === "Night Owl"
                        ? JSON.stringify(
                            streakNightOwlData?.getStreakByTimeRange
                          )
                        : badge.badgeId.badge_name === "Glucose Guru"
                          ? JSON.stringify(
                              streakBslRangeData?.getStreakTestResults
                            )
                          : badge.badgeId.badge_name === "Check-in Champion"
                            ? JSON.stringify(streakData?.getStreakTestResults)
                            : badge.badgeId.badge_name === "Fitness Streak"
                              ? JSON.stringify(
                                  streakActivityLogsData?.getStreakActivityLogs
                                )
                              : badge.badgeId.badge_name === "Knowledge Seeker"
                                ? JSON.stringify(
                                    numArticleData?.getUser.favourite_articles
                                      ?.length
                                  )
                                : "tbc"}{" "}
              / {badge.badgeId.criteria.value}
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
