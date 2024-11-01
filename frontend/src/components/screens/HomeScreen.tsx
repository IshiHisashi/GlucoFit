import {
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  Pressable,
  Text,
  VStack,
  ScrollView,
  View,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
  Modal,
  Image,
} from "@gluestack-ui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { useWindowDimensions, Share, Alert } from "react-native";
import { gql, useQuery } from "@apollo/client";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import BslLineChart from "../organisms/BslLineChart";
import BslWeeklyBarChart from "../organisms/BslWeeklyBarChart";
import { AppStackParamList } from "../../types/navigation";
import { AnalysisCustom, TimesCustom } from "../svgs/svgs";
import HeaderBasic from "../headers/HeaderBasic";
import BslTodayBarChart from "../organisms/BslTodayBarChart";
import GlucoButtonNoOutline from "../atoms/GlucoButtonNoOutline";
import LogsTable from "../organisms/LogsTable";
import {
  IconForActivityLog,
  IconForFoodLog,
  IconForGlucoseLogHappy,
  IconForGlucoseLogNeutral,
  IconForGlucoseLogSad,
  IconForMedicineLog,
} from "../svgs/svgsForLogsTableIcons";
import LogsTableTitle from "../molcules/LogsTableTitle";

// hardcode for now
const userId = "670de7a6e96ff53059a49ba8";

const TotalSteps = () => {
  const GET_TOTAL_STEPS_FOR_TODAY = gql`
    query GetTotalStepsForToday($userId: ID!) {
      getTotalStepsForToday(user_id: $userId)
    }
  `;

  const { loading, error, data } = useQuery(GET_TOTAL_STEPS_FOR_TODAY, {
    variables: { userId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>N/A Steps</Text>;

  return <Text>{data.getTotalStepsForToday} Steps</Text>;
};

// =========== queries ==============

const GET_BSL_RESULTS_AND_AVERAGE_FOR_TODAY = gql`
  query GetBslResultsAndAverageForToday($userId: ID!) {
    getTestResultsAndAverageForToday(user_id: $userId) {
      averageBsl
      testResults {
        id
        bsl
        log_timestamp
      }
    }
  }
`;

const GET_ACTIVITIES_FOR_TODAY = gql`
  query GetActivitiesForToday($userId: ID!) {
    getTodayActivityLogs(user_id: $userId) {
      duration
      id
      log_timestamp
    }
  }
`;

const GET_MEDICINES_FOR_TODAY = gql`
  query GetMedicinesForToday($userId: ID!) {
    getTodayMedicineLogs(user_id: $userId) {
      medicine_id {
        unit
        medicine_name
      }
      amount
      log_timestamp
      id
    }
  }
`;

const GET_CARBS_FOR_TODAY = gql`
  query GetCarbsForToday($userId: ID!) {
    getTodayDietLogs(userID: $userId) {
      carbs
      id
      log_timestamp
    }
  }
`;

const GET_WEEKLY_BSL_DATA = gql`
  query GetWeeklyBSLData($userId: ID!) {
    getWeeklyBSLData(user_id: $userId) {
      dateRange
      weeklyAverage
      weeklyData {
        day
        value
      }
    }
  }
`;

const GET_AVERAGE_BSL_FOR_X = gql`
  query GetAverageBslForX($userId: ID!) {
    getAverageBslXAxisValue(user_id: $userId)
  }
`;

const GET_USER = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      name
    }
  }
`;

type HomeScreenNavigationProp = NativeStackNavigationProp<AppStackParamList>;

type RouteParams = {
  mutatedLog?: string;
  insight?: any;
  badges?: any
};

interface ModalData {
  badge_desc: string;
  badge_name: string;
  badge_image_address: string;
  id: string;
}

interface Badges {
  badges: ModalData[];
}

interface BadgeImages {
  [key: string]: any; 
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<{ key: string; name: string; params: RouteParams }>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [toastReady, setToastReady] = useState<boolean>(false);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);
  console.log(route);

  const { width } = useWindowDimensions();

  const toast = useToast();

  // ================= Data rendering =====================

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER, {
    variables: { getUserId: userId },
  });

  const {
    data: bslResultsAndAverageData,
    loading: bslResultsAndAverageLoading,
    error: bslResultsAndAverageError,
    refetch: bslResultsAndAverageRefetch,
  } = useQuery(GET_BSL_RESULTS_AND_AVERAGE_FOR_TODAY, {
    variables: { userId: userId },
  });
  bslResultsAndAverageData &&
    console.log(
      "bsl:",
      bslResultsAndAverageData.getTestResultsAndAverageForToday
    );

  let latestBsl;
  if (bslResultsAndAverageData) {
    latestBsl =
      bslResultsAndAverageData.getTestResultsAndAverageForToday.testResults[
        bslResultsAndAverageData.getTestResultsAndAverageForToday.testResults
          .length - 1
      ] || {};
  }

  const {
    data: activitiesData,
    loading: activitiesLoading,
    error: activitiesError,
    refetch: activitiesRefetch,
  } = useQuery(GET_ACTIVITIES_FOR_TODAY, {
    variables: { userId: userId },
  });
  activitiesData && console.log("act:", activitiesData.getTodayActivityLogs);

  const {
    data: medicinesData,
    loading: medicinesLoading,
    error: medicinesError,
    refetch: medicinesRefetch,
  } = useQuery(GET_MEDICINES_FOR_TODAY, {
    variables: { userId: userId },
  });
  medicinesData && console.log("med:", medicinesData.getTodayMedicineLogs);

  const {
    data: carbsData,
    loading: carbsLoading,
    error: carbsError,
    refetch: carbsRefetch,
  } = useQuery(GET_CARBS_FOR_TODAY, {
    variables: { userId: userId },
  });
  carbsData && console.log("carbs:", carbsData.getTodayDietLogs);

  const {
    data: weeklyBslData,
    loading: weeklyBslLoading,
    error: weeklyBslError,
    refetch: weeklyBslRefetch,
  } = useQuery(GET_WEEKLY_BSL_DATA, {
    variables: { userId: userId },
  });
  weeklyBslData && console.log("weekly:", weeklyBslData.getWeeklyBSLData);

  const {
    data: bslForXData,
    loading: bslForXLoading,
    error: bslForXError,
    refetch: bslForXRefetch,
  } = useQuery(GET_AVERAGE_BSL_FOR_X, {
    variables: { userId: userId },
  });
  bslForXData && console.log("X:", bslForXData);

  const openArticle = (url: string, title: string) => {
    navigation.navigate("Article", {
      url,
      title,
    });
  };

  // ================= Insight logic ======================

  useEffect(() => {
    if (toastReady) {
      if (route.params?.insight) {
        toast.show({
          placement: "bottom",
          duration: null,
          render: ({ id }) => {
            const toastId = "toast-" + id;
            return (
              <Toast
                nativeID={toastId}
                bg="$secondaryY70"
                bottom="$16"
                width="90%"
                // left="$4"
                // right="$4"
              >
                <Pressable
                  onPress={() => {
                    toast.close(id);
                    navigation.setParams({ insight: undefined });
                    openArticle(
                      route.params.insight.article_url,
                      route.params.insight.article_name
                    );
                  }}
                >
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    space="sm"
                  >
                    <HStack alignItems="center" space="sm">
                      <Box
                        width={34}
                        height={34}
                        borderRadius="$full"
                        bg="$secondaryY5"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <AnalysisCustom color="#E5BA2D" size={24} />
                      </Box>
                      <VStack space="xs" width={200}>
                        <ToastTitle numberOfLines={2}>
                          {route.params.insight.article_name}
                        </ToastTitle>
                        <ToastDescription>See quick tips</ToastDescription>
                      </VStack>
                    </HStack>

                    <Pressable
                      onPress={() => {
                        toast.close(id);
                        // Clean up route params
                        navigation.setParams({ insight: undefined });
                      }}
                    >
                      <TimesCustom color="#000000" size={24} />
                    </Pressable>
                  </HStack>
                </Pressable>
              </Toast>
            );
          },
        });
        // Clean up route params after showing toast
        navigation.setParams({
          mutatedLog: route.params.mutatedLog,
          insight: undefined,
        });
      }
    }

  }, [route.params?.insight, toast, navigation, route.params?.mutatedLog, toastReady]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.mutatedLog === "bsl") {
        bslResultsAndAverageRefetch();
        weeklyBslRefetch();

        if (route.params?.insight) {
          console.log("insight:", route.params.insight);
        }
      }
      if (route.params?.mutatedLog === "activity") {
        activitiesRefetch();
      }
      if (route.params?.mutatedLog === "medicine") {
        medicinesRefetch();
      }
      if (route.params?.mutatedLog === "carb") {
        carbsRefetch();
      }
    }, [
      route.params?.mutatedLog,
      route.params?.insight,
      bslResultsAndAverageRefetch,
      activitiesRefetch,
      medicinesRefetch,
      carbsRefetch,
      weeklyBslRefetch,
    ])
  );

  let logsForToday;
  if (
    bslResultsAndAverageData &&
    activitiesData &&
    medicinesData &&
    carbsData
  ) {
    const logsForTodayRaw = [
      ...bslResultsAndAverageData.getTestResultsAndAverageForToday.testResults,
      ...activitiesData.getTodayActivityLogs,
      ...medicinesData.getTodayMedicineLogs,
      ...carbsData.getTodayDietLogs,
    ];
    console.log("raw data:", logsForTodayRaw);

    logsForTodayRaw.length > 1 &&
      logsForTodayRaw.sort((obj1, obj2) => {
        if (obj1.log_timestamp < obj2.log_timestamp) {
          return -1;
        } else if (obj1.log_timestamp > obj2.log_timestamp) {
          return 1;
        } else {
          return 0;
        }
      });

    logsForToday = logsForTodayRaw.map((obj) => {
      switch (obj.__typename) {
        case "TestResults": {
          const threshold = bslForXData.getAverageBslXAxisValue || 5.6;
          const icon =
            obj.bsl > threshold ? (
              <IconForGlucoseLogSad />
            ) : obj.bsl < threshold ? (
              <IconForGlucoseLogHappy />
            ) : (
              <IconForGlucoseLogNeutral />
            );
          return {
            id: obj.id,
            icon: icon,
            text: "Blood Glucose",
            subText: new Date(obj.log_timestamp).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
            value: obj.bsl,
            unit: "mmol/L",
            onPressRow: () =>
              navigation.navigate("GlucoseLog", {
                logId: obj.id,
              }),
          };
        }
        case "ActivityLogs":
          return {
            id: obj.id,
            icon: <IconForActivityLog />,
            text: "Activity",
            subText: new Date(obj.log_timestamp).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
            value: obj.duration,
            unit: "mins",
            onPressRow: () =>
              navigation.navigate("ActivityLog", {
                logId: obj.id,
              }),
          };
        case "MedicineLog":
          return {
            id: obj.id,
            icon: <IconForMedicineLog />,
            text: obj.medicine_id.medicine_name,
            subText: new Date(obj.log_timestamp).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
            value: obj.amount,
            unit: obj.medicine_id.unit,
            onPressRow: () =>
              navigation.navigate("MedicineLog", {
                logId: obj.id,
              }),
          };
        case "DietLog":
          return {
            id: obj.id,
            icon: <IconForFoodLog />,
            text: "Food Intake",
            subText: new Date(obj.log_timestamp).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
            value: obj.carbs,
            unit: "g",
            onPressRow: () =>
              navigation.navigate("CarbsLog", {
                logId: obj.id,
              }),
          };
        default:
          return null;
      }
    });
    console.log("sorted:", logsForToday);
  }

  // ==================== Badge modal logic section =====================

  // Badge images key value pair for now. Will be replaced with by remote location.

  const badgeImages: BadgeImages = {
    "670b2125cb185c3905515da2": require('../../../assets/badgesWithIds/670b2125cb185c3905515da2.png'),
    "670b2149cb185c3905515da4": require('../../../assets/badgesWithIds/670b2149cb185c3905515da4.png'),
    "670b215bcb185c3905515da6": require('../../../assets/badgesWithIds/670b215bcb185c3905515da6.png'),
    "670b216fcb185c3905515da8": require('../../../assets/badgesWithIds/670b216fcb185c3905515da8.png'),
    "670b2188cb185c3905515daa": require('../../../assets/badgesWithIds/670b2188cb185c3905515daa.png'),
    "670b2192cb185c3905515dac": require('../../../assets/badgesWithIds/670b2192cb185c3905515dac.png'),
    "670b2199cb185c3905515dae": require('../../../assets/badgesWithIds/670b2199cb185c3905515dae.png'),
    "670b21a8cb185c3905515db0": require('../../../assets/badgesWithIds/670b21a8cb185c3905515db0.png'),
    "670b21b1cb185c3905515db2": require('../../../assets/badgesWithIds/670b21b1cb185c3905515db2.png'),
  };

  // When coming to Home and has badges param, open modal
  useEffect(() => {
    if (route.params?.badges.length > 0) {
      setModalVisible(true);
      console.log("modal on")
    } else {
      console.log("modal not working")
    }
  },[navigation, route.params?.badges])

  // Sequential badges modal
  const handleClose = () => {
    if (currentModalIndex < route.params?.badges.length - 1) {
      setCurrentModalIndex(currentModalIndex + 1);
    } else {
      setModalVisible(false);
      setToastReady(true);
    }
  }

  // Go to Badges screen
  const moveToBadges = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("Tabs", {
      screen: "BadgeScreen"
    })
  }

  // Just share functionality
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "You will be able to share things from hereeee!",
      });
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
    <SafeAreaView>
      <ScrollView>
        <HeaderBasic
          routeName={route.name as "Home"}
          userName={userData?.getUser.name}
          navigation={navigation}
        />
        <VStack p="$4" space="md">
        {route.params?.badges?.length > 0 && (
          <Modal isOpen={modalVisible} onClose={() => handleClose()} >
            <Modal.Content position="absolute" bottom={120} height="70%" borderRadius={20} backgroundColor="white">
              <Modal.CloseButton />
              <View
                style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', flexGrow: 1}}
              >
                <Button onPress={() => handleClose()} >
                  <ButtonText>
                    Close
                  </ButtonText>
                </Button>
                <Text textAlign="center">Congratulations!</Text>
                <Text textAlign="center">You unlocked a new badge</Text>
                <View style={{ flexBasis: '100%', alignItems: 'center', marginBottom: 10 }}>
                  <Image w={120} h={120} source={badgeImages[route.params?.badges[currentModalIndex]?.id]} alt={route.params?.badges[currentModalIndex].badge_name} marginBottom={8} />
                  <Text color="$black" fontSize={20} textAlign="center" >{ route.params?.badges[currentModalIndex].badge_name }</Text>
                  <Text textAlign="center">{ route.params?.badges[currentModalIndex].badge_desc }</Text>
                </View>
                <Button onPress={() => onShare()}>
                  <ButtonText>
                    Share
                  </ButtonText>
                </Button>
                <Button onPress={() => moveToBadges()}>
                  <ButtonText>
                    View All Badges
                  </ButtonText>
                </Button>                
              </View>
            </Modal.Content>
          </Modal>
        )}

          <VStack
            space="sm"
            borderWidth={1}
            borderColor="$borderLight200"
            borderRadius="$md"
            p="$4"
          >
            <HStack alignItems="center" justifyContent="space-between">
              {bslResultsAndAverageData && (
                <VStack>
                  <HStack alignItems="center" space="xs">
                    <Text fontSize="$4xl" fontFamily="$bold">
                      {latestBsl.bsl}
                    </Text>
                    <Text>mmol/L</Text>
                  </HStack>
                  <Text>
                    {new Date(latestBsl.log_timestamp).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </Text>
                </VStack>
              )}
              <TotalSteps />
            </HStack>

            {bslResultsAndAverageData && (
              // <BslLineChart
              //   width={width}
              //   data={
              //     bslResultsAndAverageData.getTestResultsAndAverageForToday
              //       .testResults
              //   }
              // />
              <BslTodayBarChart
                width={width}
                data={
                  bslResultsAndAverageData.getTestResultsAndAverageForToday
                    .testResults
                }
              />
            )}
          </VStack>

          <VStack
            borderWidth={1}
            borderColor="$borderLight200"
            borderRadius="$md"
            p="$4"
          >
            <Text>Do you want to connect your device?</Text>
            <Text>Supporting text here</Text>
            <Button>
              <ButtonText>Connect device</ButtonText>
            </Button>
          </VStack>

          <LogsTable
            title="Logs for today"
            subTitle="date date"
            onPressTitleRightButton={() =>
              navigation.navigate("Tabs", { screen: "Logs" })
            }
            rowsData={logsForToday}
          />

          <VStack
            borderWidth={1}
            borderColor="$primaryIndigo10"
            borderRadius={10}
            p="$4"
            bg="$neutralWhite"
          >
            <LogsTableTitle
              title="Weekly Snapshots"
              subTitle={weeklyBslData?.getWeeklyBSLData.dateRange}
              onPressTitleRightButton={() =>
                navigation.navigate("Tabs", { screen: "Logs" })
              }
            />

            <HStack
              alignItems="center"
              justifyContent="space-between"
              space="sm"
            >
              <Center>
                <Text size="3xl" fontFamily="$bold">
                  {weeklyBslData
                    ? weeklyBslData.getWeeklyBSLData.weeklyAverage
                    : "N/A"}
                </Text>
                <Text>mmol/L</Text>
                <Text>Average</Text>
              </Center>

              {weeklyBslData && bslForXData && (
                <BslWeeklyBarChart
                  width={width}
                  data={weeklyBslData.getWeeklyBSLData.weeklyData}
                  bslBorder={bslForXData.getAverageBslXAxisValue || 5.6}
                />
              )}
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
