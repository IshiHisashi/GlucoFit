import { useLazyQuery, useQuery } from "@apollo/client";
import { View, Text, Image, Modal, Button, Pressable, HStack, ScrollView, Center, } from "@gluestack-ui/themed";
import React, { useContext, useEffect, useState } from "react";
import { GET_ALL_BADGES_INFO_BY_USER } from "../../../utils/query/badgesScreenQueries";
import { GET_NUM_FAVORITE_ARTICLE, QUERY_FOR_STREAK_ACTIVITYLOGS, QUERY_FOR_STREAK_BY_TIME_RANGE, QUERY_FOR_STREAK_STARTER } from "../../../utils/query/badgeProgressQuery";
import { AuthContext } from "../../../context/AuthContext";

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
    last_updated: string | null;
  };
}

interface BadgeImages {
  [key: string]: any; 
}

const BadgesScreen: React.FC = () => {
  const [badgeData, setBadgeData] = useState<Badge[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedBadge, setSelectedBadge] = useState<String>();
  const { userId, LogIn, setOnboardingComplete } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_ALL_BADGES_INFO_BY_USER, {
    variables: { getUserBadgeId: userId },
  });

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

  const switchModal = () => {
    setModalVisible(!modalVisible);
  }

  const handleClickBadge = (id: String) => {
    setSelectedBadge(id);
    setModalVisible(true);
  }

  // This will go away once we put the data online
  const badgeImages: BadgeImages = {
    "670b2125cb185c3905515da2": require('../../../../assets/badgesWithIds/FirstStep.png'),
    "670b2149cb185c3905515da4": require('../../../../assets/badgesWithIds/StreakStarter.png'),
    "670b215bcb185c3905515da6": require('../../../../assets/badgesWithIds/HealthyHabit.png'),
    "670b216fcb185c3905515da8": require('../../../../assets/badgesWithIds/EarlyBird.png'),
    "670b2188cb185c3905515daa": require('../../../../assets/badgesWithIds/NightOwl.png'),
    "670b2192cb185c3905515dac": require('../../../../assets/badgesWithIds/FitnessStreak.png'),
    "670b2199cb185c3905515dae": require('../../../../assets/badgesWithIds/StableStar.png'),
    "670b21a8cb185c3905515db0": require('../../../../assets/badgesWithIds/CheckIn.png'),
    "670b21b1cb185c3905515db2": require('../../../../assets/badgesWithIds/KnowledgeSeeker.png'),
  };
  
  const notAchieveBadgeImages:BadgeImages = {
    "670b2125cb185c3905515da2": require('../../../../assets/badgesWithIds/FirstStepNotAchieved.png'),
    "670b2149cb185c3905515da4": require('../../../../assets/badgesWithIds/StreakStarterNotAchieved.png'),
    "670b215bcb185c3905515da6": require('../../../../assets/badgesWithIds/HealthyHabitNotAchieved.png'),
    "670b216fcb185c3905515da8": require('../../../../assets/badgesWithIds/EarlyBirdNotAchieved.png'),
    "670b2188cb185c3905515daa": require('../../../../assets/badgesWithIds/NightOwlNotAchieved.png'),
    "670b2192cb185c3905515dac": require('../../../../assets/badgesWithIds/FitnessStreakNotAchieved.png'),
    "670b2199cb185c3905515dae": require('../../../../assets/badgesWithIds/StableStarNotAchieved.png'),
    "670b21a8cb185c3905515db0": require('../../../../assets/badgesWithIds/CheckInNotAchieved.png'),
    "670b21b1cb185c3905515db2": require('../../../../assets/badgesWithIds/KnowledgeSeekerNotAchieved.png'),
  }

  useEffect(() => {
    if (data?.getUserBadge?.badges) {
      setBadgeData(data.getUserBadge.badges);
    }
  }, [data])

  return (
    <View padding={16}>
      <Text fontSize={22} color="black" fontWeight={"$bold"} marginBottom={20}>Collected Badges</Text>
      {/* I have to make this part scrollable horizontally */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} paddingLeft={4} marginBottom={20} >
        {badgeData.map( b => {
          if (b.achieved === true) {
            return (
              <Pressable key={b.badgeId.id} onPress={() => handleClickBadge(b.badgeId.id)} marginVertical={10}>
                <Center borderRadius={10} paddingVertical={10} paddingHorizontal={20} backgroundColor="white" width={140} marginRight={16} style={{shadowColor:"black", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.5,}}>
                  <Image w={100} h={100} source={badgeImages[b.badgeId.id]} alt={b.badgeId.badge_name} marginBottom={14}/>
                  <Text color="black" fontSize={14}>{b.badgeId.badge_name}</Text>
                </Center>               
              </Pressable>

            )
          }
        })}        
      </ScrollView>

      <Text fontSize={22} color="black" fontWeight={"$bold"} marginBottom={20}>All Badges</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {
          badgeData.map( b => {
            if (b.achieved === true) {
              return (
                <Pressable style={{ width: '28%', marginBottom: 10 }} key={b.badgeId.id} onPress={() => handleClickBadge(b.badgeId.id)}>
                  <Center>
                    {/* Change Image to dynamic rendering from remote path later */}
                    <Image w={80} h={80} source={badgeImages[b.badgeId.id]} alt={b.badgeId.badge_name} marginBottom={8} />
                    <Text color="black" fontSize={12} textAlign="center" >{b.badgeId.badge_name}</Text>            
                  </Center>                    
                </Pressable>
         
              )
            } else {
              return (
                <Pressable style={{ width: '28%', marginBottom: 10 }} key={b.badgeId.id} onPress={() => handleClickBadge(b.badgeId.id)}>
                  <Center>
                    {/* Change Image to dynamic rendering from remote path later */}
                    <Image w={80} h={80} source={notAchieveBadgeImages[b.badgeId.id]} opacity={b.achieved ? 1 : 0.5} alt={b.badgeId.badge_name} marginBottom={8} />
                    <Text color="$trueGray400" fontSize={12} textAlign="center" >{b.badgeId.badge_name}</Text>            
                  </Center>                   
                </Pressable>
         
              )
            }
          })
        }        
      </View>
      <Modal isOpen={modalVisible}>
        <View
          position="absolute"
          bottom={95}
          width="100%"
          height="40%"
          borderTopRightRadius={20}
          borderTopLeftRadius={20}
          backgroundColor="white"
          style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', flexGrow: 1}}
        >
          <Button onPress={switchModal}>
            <Text>
              Close
            </Text>
          </Button>
          {
            badgeData.map( b => {
              if ( b.badgeId.id === selectedBadge ) {
                return (
                  <View style={{ flexBasis: '100%', alignItems: 'center', marginBottom: 10 }}>
                    <Image w={120} h={120} source={badgeImages[b.badgeId.id]} opacity={b.achieved ? 1 : 0.5} alt={b.badgeId.badge_name} marginBottom={8} />
                    <Text color="$black" fontSize={20} textAlign="center" >{b.badgeId.badge_name}</Text>
                    <Text textAlign="center" >{b.badgeId.badge_desc}</Text>
                    {b.achieved ? 
                      <View>
                        <Text textAlign="center">
                          Unlocked on
                        </Text>
                        <Text textAlign="center">
                          09 / 25 / 2024 (hard coded)
                        </Text>
                      </View>
                    :
                      <View>
                        <Text textAlign="center">
                          Your Progress
                        </Text>
                        <Text textAlign="center">
                          {getBadgeProgress(b.badgeId.badge_name)} / {b.badgeId.criteria.value}
                        </Text>
                      </View>
                    }
                  </View>            
                )
              }
              return null
            })
          } 

        </View>
      </Modal>
    </View>
  );
};

export default BadgesScreen;
