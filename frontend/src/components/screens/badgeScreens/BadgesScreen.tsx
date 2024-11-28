import { useLazyQuery, useQuery } from "@apollo/client";
import {
  View,
  Text,
  Image,
  Button,
  Pressable,
  HStack,
  ScrollView,
  Center,
  ButtonText,
} from "@gluestack-ui/themed";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { GET_ALL_BADGES_INFO_BY_USER } from "../../../utils/query/badgesScreenQueries";
import {
  GET_NUM_FAVORITE_ARTICLE,
  QUERY_FOR_STREAK_ACTIVITYLOGS,
  QUERY_FOR_STREAK_BY_TIME_RANGE,
  QUERY_FOR_STREAK_STARTER,
} from "../../../utils/query/badgeProgressQuery";
import { AuthContext } from "../../../context/AuthContext";
import { BlurView } from "@react-native-community/blur";
import { Alert, Share, StyleSheet, Modal } from "react-native";
import GlucoButton from "../../atoms/GlucoButton";
import { AngleRightCustom, ShareCustom } from "../../svgs/svgs";
import { useFocusEffect } from "@react-navigation/native";

interface Badge {
  __typename: string;
  achieved: boolean;
  badgeId: {
    __typename: string;
    badge_desc: string;
    badge_image_address: string;
    badge_name: string;
    criteria: object[];
    id: string;
    unlocked: string;
    locked: string;
  };
}

interface BadgeImages {
  [key: string]: any;
}

interface badgeScreenTypes {
  setBackGroundTinted: any;
}

const BadgesScreen: React.FC<badgeScreenTypes> = ({ setBackGroundTinted }) => {
  const [badgeData, setBadgeData] = useState<Badge[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedBadge, setSelectedBadge] = useState<string>();
  const { userId } = useContext(AuthContext);

  const { loading, error, data, refetch } = useQuery(GET_ALL_BADGES_INFO_BY_USER, {
    variables: { getUserBadgeId: userId },
    fetchPolicy: "cache-and-network",
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    console.log(selectedBadge);
  }, [selectedBadge])

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

  useEffect(() => {
    if (data?.getUserBadge?.badges) {
      data.getUserBadge.badges.forEach((badge: any) => {
        const loadBadgeData = badgeLoaders[badge.badgeId.badge_name];
        if (loadBadgeData) loadBadgeData();
      });
    }
  }, [data]);

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

  // if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error: {error.message}</Text>;

  const closeModal = () => {
    setModalVisible(false);
    setBackGroundTinted(false);
  };

  const handleClickBadge = (id: string) => {
    setSelectedBadge(id);
    setModalVisible(true);
    setBackGroundTinted(true);
  };

  // This will go away once we put the data online
  const badgeImages: BadgeImages = {
    "670b2125cb185c3905515da2": require("../../../../assets/badgesWithIds/FirstStep.png"),
    "670b2149cb185c3905515da4": require("../../../../assets/badgesWithIds/StreakStarter.png"),
    "670b215bcb185c3905515da6": require("../../../../assets/badgesWithIds/HealthyHabit.png"),
    "670b216fcb185c3905515da8": require("../../../../assets/badgesWithIds/EarlyBird.png"),
    "670b2188cb185c3905515daa": require("../../../../assets/badgesWithIds/NightOwl.png"),
    "670b2192cb185c3905515dac": require("../../../../assets/badgesWithIds/FitnessStreak.png"),
    "670b2199cb185c3905515dae": require("../../../../assets/badgesWithIds/StableStar.png"),
    "670b21a8cb185c3905515db0": require("../../../../assets/badgesWithIds/CheckIn.png"),
    "670b21b1cb185c3905515db2": require("../../../../assets/badgesWithIds/KnowledgeSeeker.png"),
  };

  const notAchieveBadgeImages: BadgeImages = {
    "670b2125cb185c3905515da2": require("../../../../assets/badgesWithIds/FirstStepNotAchieved.png"),
    "670b2149cb185c3905515da4": require("../../../../assets/badgesWithIds/StreakStarterNotAchieved.png"),
    "670b215bcb185c3905515da6": require("../../../../assets/badgesWithIds/HealthyHabitNotAchieved.png"),
    "670b216fcb185c3905515da8": require("../../../../assets/badgesWithIds/EarlyBirdNotAchieved.png"),
    "670b2188cb185c3905515daa": require("../../../../assets/badgesWithIds/NightOwlNotAchieved.png"),
    "670b2192cb185c3905515dac": require("../../../../assets/badgesWithIds/FitnessStreakNotAchieved.png"),
    "670b2199cb185c3905515dae": require("../../../../assets/badgesWithIds/StableStarNotAchieved.png"),
    "670b21a8cb185c3905515db0": require("../../../../assets/badgesWithIds/CheckInNotAchieved.png"),
    "670b21b1cb185c3905515db2": require("../../../../assets/badgesWithIds/KnowledgeSeekerNotAchieved.png"),
  };

  useEffect(() => {
    if (data?.getUserBadge?.badges) {
      setBadgeData(data.getUserBadge.badges);
    }
  }, [data]);

  const onShare = async () => {
    try {
      const badge = badgeData.find(item => item.badgeId.id === selectedBadge);

      const result = await Share.share(
        badge?.achieved?
          {
            message: `I've finally unlocked ${badge?.badgeId.badge_name} badge! #GlucoFit #Diabetes`,
          }
        :
          {
            message: `I'm working so hard to get this ${badge?.badgeId.badge_name} badge! Let's support each other! #GlucoFit #Diabetes`,
          }
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View padding={16}>
      <Text fontSize={22} color="black" fontWeight={"$bold"} marginBottom={20}>
        Collected Badges
      </Text>
      {/* I have to make this part scrollable horizontally */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        paddingLeft={4}
        marginBottom={20}
      >
        {badgeData.map((b) => {
          if (b.achieved === true) {
            return (
              <Pressable
                key={b.badgeId.id}
                onPress={() => handleClickBadge(b.badgeId.id)}
                marginVertical={10}
              >
                <Center
                  borderRadius={10}
                  paddingVertical={14}
                  paddingHorizontal={20}
                  backgroundColor="white"
                  width={145}
                  marginRight={16}
                  style={{
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                  }}
                >
                  <Image
                    w={100}
                    h={100}
                    source={badgeImages[b.badgeId.id]}
                    alt={b.badgeId.badge_name}
                    marginBottom={14}
                  />
                  <Center height={40}>
                    <Text
                      color="black"
                      fontSize={14}
                      textAlign="center"
                      fontFamily="$bold"
                    >
                      {b.badgeId.badge_name}
                    </Text>
                  </Center>
                </Center>
              </Pressable>
            );
          }
        })}
      </ScrollView>

      <Text fontSize={22} color="black" fontWeight={"$bold"} marginBottom={20}>
        All Badges
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {badgeData.map((b) => {
          if (b.achieved === true) {
            return (
              <Pressable
                style={{ width: "28%", marginBottom: 10 }}
                key={b.badgeId.id}
                onPress={() => handleClickBadge(b.badgeId.id)}
              >
                <Center>
                  {/* Change Image to dynamic rendering from remote path later */}
                  <Image
                    w={80}
                    h={80}
                    source={badgeImages[b.badgeId.id]}
                    alt={b.badgeId.badge_name}
                    marginBottom={8}
                  />
                  <Text color="black" fontSize={12} textAlign="center">
                    {b.badgeId.badge_name}
                  </Text>
                </Center>
              </Pressable>
            );
          } else {
            return (
              <Pressable
                style={{ width: "28%", marginBottom: 10 }}
                key={b.badgeId.id}
                onPress={() => handleClickBadge(b.badgeId.id)}
              >
                <Center>
                  {/* Change Image to dynamic rendering from remote path later */}
                  <Image
                    w={80}
                    h={80}
                    source={notAchieveBadgeImages[b.badgeId.id]}
                    opacity={b.achieved ? 1 : 0.5}
                    alt={b.badgeId.badge_name}
                    marginBottom={8}
                  />
                  <Text color="$trueGray400" fontSize={12} textAlign="center">
                    {b.badgeId.badge_name}
                  </Text>
                </Center>
              </Pressable>
            );
          }
        })}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={3}
          reducedTransparencyFallbackColor="gray"
        />
        <View
          position="absolute"
          bottom={0}
          width="100%"
          height={380}
          borderTopRightRadius={20}
          borderTopLeftRadius={20}
          backgroundColor="white"
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {badgeData.map((b) => {
            if (b.badgeId.id === selectedBadge) {
              return (
                <Center id={b.badgeId.id} width={"$full"} height={"$full"}>
                  <Button
                    onPress={() => setModalVisible(false)}
                    backgroundColor="transparent"
                    marginTop={-70}
                    position="absolute"
                    bottom={330}
                  >
                    <ButtonText
                      position="relative"
                      padding={20}
                      top={-10}
                      left={150}
                    >
                      ✖️
                    </ButtonText>
                  </Button>
                  {b.achieved === true ? (
                    <Image
                      w={144}
                      h={144}
                      source={badgeImages[b.badgeId.id]}
                      alt={b.badgeId.badge_name}
                      marginBottom={8}
                      position="absolute"
                      top={-72}
                      left="50%"
                      transform={[{ translateX: -72 }]}
                      borderRadius={80}
                      borderWidth={4}
                      borderColor="white"
                    />
                  ) : (
                    <Image
                      w={144}
                      h={144}
                      source={notAchieveBadgeImages[b.badgeId.id]}
                      alt={b.badgeId.badge_name}
                      marginBottom={8}
                      position="absolute"
                      top={-72}
                      left="50%"
                      transform={[{ translateX: -72 }]}
                      borderRadius={80}
                      borderWidth={4}
                      borderColor="white"
                    />
                  )}
                  <Text
                    color="$black"
                    fontSize={20}
                    textAlign="center"
                    marginTop={40}
                  >
                    {b.badgeId.badge_name}
                  </Text>
                  <Text
                    textAlign="center"
                    marginTop={10}
                    marginBottom={30}
                    paddingHorizontal={10}
                  >
                    {b.achieved === true
                      ? b.badgeId.unlocked
                      : b.badgeId.locked}
                  </Text>
                  {b.achieved ? (
                    <View>
                      <Text textAlign="center" color="black">
                        Unlocked
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text textAlign="center" color="black">
                        Your Progress
                      </Text>
                      <Text textAlign="center" color="black">
                        {getBadgeProgress(b.badgeId.badge_name)} /{" "}
                        {b.badgeId.criteria.value}
                      </Text>
                    </View>
                  )}
                  <GlucoButton
                    buttonType="primary"
                    text="Share"
                    isFocused={false}
                    isDisabled={false}
                    onPress={() => onShare()}
                    iconLeft={ShareCustom}
                    style={{ width: 347, height: 52, marginTop: 20 }}
                  />
                </Center>
              );
            }
            return null;
          })}
        </View>
      </Modal>
    </View>
  );
};

export default BadgesScreen;
