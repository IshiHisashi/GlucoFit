import React, { useCallback, useContext, useEffect } from "react";
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
import { AuthContext } from "../../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

interface BadgeImages {
  [key: string]: any;
}

interface ProgressBudgeSectionProps {
  goToBadges: () => void;
}

interface ProgressBudgeProps {
  goToBadges: () => void;
}

const ProgressBudgeSection: React.FC<ProgressBudgeSectionProps> = ({
  goToBadges,
}) => {
  const { userId } = useContext(AuthContext);

  // 1).Fetch user badges using useQuery
  const { loading, error, data, refetch } = useQuery(GET_USER_ON_PROGRESS_BADGES, {
    variables: { id: userId },
    fetchPolicy: "cache-and-network",
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

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

  // This will go away once we put the data online
  const badgeImages: BadgeImages = {
    "670b2125cb185c3905515da2": require("../../../assets/badgesWithIds/FirstStep.png"),
    "670b2149cb185c3905515da4": require("../../../assets/badgesWithIds/StreakStarter.png"),
    "670b215bcb185c3905515da6": require("../../../assets/badgesWithIds/HealthyHabit.png"),
    "670b216fcb185c3905515da8": require("../../../assets/badgesWithIds/EarlyBird.png"),
    "670b2188cb185c3905515daa": require("../../../assets/badgesWithIds/NightOwl.png"),
    "670b2192cb185c3905515dac": require("../../../assets/badgesWithIds/FitnessStreak.png"),
    "670b2199cb185c3905515dae": require("../../../assets/badgesWithIds/StableStar.png"),
    "670b21a8cb185c3905515db0": require("../../../assets/badgesWithIds/CheckIn.png"),
    "670b21b1cb185c3905515db2": require("../../../assets/badgesWithIds/KnowledgeSeeker.png"),
  };

  const switchToBadges = () => {
    goToBadges();
  };

  return (
    <View
      flexDirection="column"
      gap={20}
      borderColor="#ECE5FF"
      borderWidth={1}
      rounded={10}
      padding={20}
      backgroundColor="white"
    >
      {/* Section header */}
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize={20} fontFamily="$bold">
          Progress
        </Text>
        <Pressable onPress={goToBadges}>
          <HStack alignItems="center" space="xs">
            <Text fontSize={12} fontFamily="$sem">
              See more
            </Text>
            <Icon as={ChevronRightIcon} size="xl" mr="$2" color="#4800FF" />
          </HStack>
        </Pressable>
      </View>

      {/* Render Badge Cards */}
      <ScrollView height={220}>
        {data?.getUserOnProgressBadge?.badges.map((badge: any) => (
          <View
            key={badge.badgeId.id}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            borderColor="#ddd"
            borderBottomWidth={1}
            p={12}
            flexWrap="nowrap"
          >
            <View flexDirection="row" gap={8} alignItems="center" flexGrow={1}>
              {/* NEED TO BE REPLACED CONDITIONALLY */}
              <Image
                source={badgeImages[badge.badgeId.id]}
                alt="Local Image"
                w={40}
                h={40}
              />
              <View flexShrink={1} flexBasis={"$3/5"}>
                <Text fontSize={14} fontFamily="$bold">
                  {badge.badgeId.badge_name}
                </Text>
                <Text fontSize={12} color="#999999">
                  {badge.badgeId.badge_desc}
                </Text>
              </View>
            </View>
            <Text
              marginLeft={10}
              textAlign="right"
              fontSize={22}
              fontFamily="$bold"
            >
              {getBadgeProgress(badge.badgeId.badge_name)}/
              {badge.badgeId.criteria.value}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const ProgressBudge: React.FC<ProgressBudgeProps> = ({ goToBadges }) => {
  return <ProgressBudgeSection goToBadges={goToBadges} />;
};

export default ProgressBudge;
