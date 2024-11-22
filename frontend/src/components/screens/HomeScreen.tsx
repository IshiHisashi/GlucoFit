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
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useWindowDimensions, Share, Alert, StyleSheet } from "react-native";
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
import { AnalysisCustom, TimesCustom, NavToBelowCustom, MedalCustom, ShareCustom } from "../svgs/svgs";
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
import { AuthContext } from "../../context/AuthContext";
import GlucoButton from "../atoms/GlucoButton";
import { BlurView } from "@react-native-community/blur";

// const TotalSteps = () => {
//   const GET_TOTAL_STEPS_FOR_TODAY = gql`
//     query GetTotalStepsForToday($userId: ID!) {
//       getTotalStepsForToday(user_id: $userId)
//     }
//   `;

//   const { loading, error, data } = useQuery(GET_TOTAL_STEPS_FOR_TODAY, {
//     variables: { userId },
//   });

//   if (loading) return <Text>Loading...</Text>;
//   if (error) return <Text>N/A Steps</Text>;

//   return <Text>{data.getTotalStepsForToday} Steps</Text>;
// };

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
  query GetTodayActivityLogs($userId: ID!) {
    getTodayActivityLogs(user_id: $userId) {
      duration
      id
      log_timestamp
      activityType
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
      time_period
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
      maximum_bsl
      minimum_bsl
    }
  }
`;

const HAS_TEST_RESULTS = gql`
  query HasTestResults($user_id: ID!) {
    hasTestResults(user_id: $user_id)
  }
`;

type HomeScreenNavigationProp = NativeStackNavigationProp<AppStackParamList>;

type RouteParams = {
  mutatedLog?: string;
  insight?: any;
  badges?: any;
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
  const { userId } = useContext(AuthContext);

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
  // console.log("USER :", userData);

  const {
    data: bslResultsAndAverageData,
    loading: bslResultsAndAverageLoading,
    error: bslResultsAndAverageError,
    refetch: bslResultsAndAverageRefetch,
  } = useQuery(GET_BSL_RESULTS_AND_AVERAGE_FOR_TODAY, {
    variables: { userId: userId },
  });
  // bslResultsAndAverageData &&
  //   console.log(
  //     "bsl:",
  //     bslResultsAndAverageData.getTestResultsAndAverageForToday
  //   );

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
  // activitiesData && console.log("act:", activitiesData.getTodayActivityLogs);

  const {
    data: medicinesData,
    loading: medicinesLoading,
    error: medicinesError,
    refetch: medicinesRefetch,
  } = useQuery(GET_MEDICINES_FOR_TODAY, {
    variables: { userId: userId },
  });
  // medicinesData && console.log("med:", medicinesData.getTodayMedicineLogs);

  const {
    data: carbsData,
    loading: carbsLoading,
    error: carbsError,
    refetch: carbsRefetch,
  } = useQuery(GET_CARBS_FOR_TODAY, {
    variables: { userId: userId },
  });
  // carbsData && console.log("carbs:", carbsData.getTodayDietLogs);

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

  const { data: hasData, refetch: refetchHasData } = useQuery(
    HAS_TEST_RESULTS,
    {
      variables: { user_id: userId },
    }
  );

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
  }, [
    route.params?.insight,
    toast,
    navigation,
    route.params?.mutatedLog,
    toastReady,
  ]);

  useFocusEffect(
    useCallback(() => {
      refetchHasData();
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
      refetchHasData,
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
          const threshold = bslForXData?.getAverageBslXAxisValue || 5.6;
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
            text: obj.activityType,
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
            text: obj.time_period,
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

  // When coming to Home and has badges param, open modal
  useEffect(() => {
    if (route.params?.badges?.length > 0) {
      setModalVisible(true);
      console.log("modal on");
    } else {
      console.log("modal not working");
    }
  }, [navigation, route.params?.badges]);

  // Sequential badges modal
  const handleClose = () => {
    if (currentModalIndex < route.params?.badges.length - 1) {
      setCurrentModalIndex(currentModalIndex + 1);
    } else {
      setModalVisible(false);
      setToastReady(true);
    }
  };

  // Go to Badges screen
  const moveToBadges = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("Tabs", {
      screen: "BadgeScreen",
    });
  };

  // Just share functionality
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "You will be able to share things from hereeee!",
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
    <SafeAreaView
      style={{ backgroundColor: "#4800FF" }}
      showsVerticalScrollIndicator={false}
    >
      <HeaderBasic
        routeName={route.name as "Home"}
        userName={userData?.getUser.name}
        navigation={navigation}
      />
      <ScrollView bg="$neutralDark5" h="106%">
        <View
          h={550}
          bg="#4800FF"
          position="absolute"
          top={-450}
          left={0}
          right={0}
          zIndex={-1}
        ></View>
        {/* Shown when no testResult log in an user */}
        {!hasData?.hasTestResults && (
          <VStack p="$4" space="md">
            <VStack
              space="xs"
              borderWidth={1}
              borderColor="$primaryIndigo10"
              borderRadius={10}
              bg="$neutralWhite"
              px="$4"
              py="$8"
            >
              <HStack justifyContent="space-between">
                <HStack space="xs" alignItems="center">
                  <Text fontSize="$5xl" fontFamily="$bold">
                    0
                  </Text>
                  <Text>mmol/L</Text>
                </HStack>
              </HStack>
              <Image
                mx="auto"
                source={require("../../../assets/allset.png")}
                alt="icon-face"
                width={200}
                height={200}
                marginBottom={20}
              />
              <Text textAlign="center" fontFamily="$bold" fontSize="$2xl">
                Record your first blood sugar values
              </Text>
              <VStack alignItems="center" mt={30}>
                <NavToBelowCustom color="#FFB5A6" />
                <NavToBelowCustom color="#FF6B4D" />
              </VStack>
            </VStack>
            <Pressable onPress={() => navigation.navigate("AutoLog")}>
              <HStack
                space="sm"
                borderWidth={1}
                borderColor="$primaryIndigo10"
                borderRadius={10}
                bg="$neutralWhite"
                px="$4"
                py="$8"
                alignItems="center"
                // onPress={() => {
                //   navigation.navigate("AutoLog");
                // }}
              >
                <Image
                  mx="auto"
                  source={require("../../../assets/insert-strip-home.png")}
                  alt="icon-face"
                  width={53}
                  height={64}
                />
                <VStack flex={1}>
                  <Text fontSize="$lg" fontFamily="$bold">
                    Have a glucose device?
                  </Text>
                  <Text fontSize="$sm">
                    Make sure the bluetooth is turned on and the glucometer is
                    nearby.
                  </Text>
                </VStack>
              </HStack>
            </Pressable>
          </VStack>
        )}
        {/* Shown when testResult log exists */}
        {hasData?.hasTestResults && (
          <VStack p="$4" space="md">
            {route.params?.badges?.length > 0 && (
              <Modal isOpen={modalVisible} onClose={() => handleClose()}>
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType="dark"
                  blurAmount={2} 
                  reducedTransparencyFallbackColor="gray"
                />
                <Modal.Content
                  alignSelf="center"
                  justifyContent="center"
                  borderRadius={10}
                  backgroundColor="white"
                >
                  <Modal.CloseButton />
                  <View>
                    <Center>
                      <Button
                        onPress={() => handleClose()}
                        flexGrow={1}
                        backgroundColor="transparent"
                        padding={10}
                        marginTop={-30}
                      >
                        <ButtonText position="relative" top={20} left={120}>
                          ✖️
                        </ButtonText>
                      </Button>
                      <Text textAlign="center">Congratulations!</Text>
                      <Text
                        textAlign="center"
                        fontSize={22}
                        color="black"
                        fontFamily="$bold"
                        marginHorizontal={20}
                      >
                        You've unlocked
                      </Text>
                      <Text
                        textAlign="center"
                        fontSize={22}
                        color="black"
                        fontFamily="$bold"
                        marginHorizontal={20}
                        marginBottom={20}
                      >
                        a new badge
                      </Text>
                      <Image
                        w={150}
                        h={150}
                        source={
                          badgeImages[
                            route.params?.badges[currentModalIndex]?.id
                          ]
                        }
                        alt={route.params?.badges[currentModalIndex].badge_name}
                        marginBottom={8}
                      />
                      <Text
                        color="$black"
                        fontSize={20}
                        textAlign="center"
                        marginVertical={10}
                        fontFamily="$bold"
                      >
                        {route.params?.badges[currentModalIndex].badge_name}
                      </Text>
                      <Text textAlign="center" marginBottom={25}>
                        {route.params?.badges[currentModalIndex].unlocked}
                      </Text>
                      <GlucoButton 
                        buttonType="primary"
                        text="Share"
                        isFocused={false}
                        isDisabled={false}
                        onPress={() => onShare()}
                        iconLeft={ShareCustom}
                        style={{ width: 214, height: 48, marginBottom: 12 }}
                      />
                      <GlucoButton 
                        buttonType="secondary"
                        text="View All Badges"
                        isFocused={false}
                        isDisabled={false}
                        onPress={() => moveToBadges()}
                        iconLeft={MedalCustom}
                        style={{ width: 214, height: 48, marginBottom: 20  }}
                      />
                    </Center>
                  </View>
                </Modal.Content>
              </Modal>
            )}
            {/* Daily data */}
            <VStack
              space="sm"
              borderWidth={1}
              borderColor="$primaryIndigo10"
              borderRadius={10}
              p="$4"
              bg="$neutralWhite"
            >
              <HStack alignItems="center" justifyContent="space-between">
                {bslResultsAndAverageData && (
                  <HStack alignItems="center" space="xs">
                    <Text fontSize="$5xl" fontFamily="$bold">
                      {latestBsl.bsl ? latestBsl.bsl?.toFixed(1) : "-"}
                    </Text>
                    <VStack>
                      <Text>mmol/L</Text>
                      <Text>
                        {latestBsl.log_timestamp
                          ? new Date(latestBsl.log_timestamp).toLocaleString(
                              "en-US",
                              {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              }
                            )
                          : " "}
                      </Text>
                    </VStack>
                  </HStack>
                )}
                {/* <TotalSteps /> */}
              </HStack>

              {bslResultsAndAverageData && (
                <BslTodayBarChart
                  width={width}
                  data={
                    bslResultsAndAverageData.getTestResultsAndAverageForToday
                      .testResults
                  }
                  bslMax={Number(userData.getUser.maximum_bsl.toFixed(1))}
                  bslMin={Number(userData.getUser.minimum_bsl.toFixed(1))}
                />
              )}
            </VStack>
            {/* Logs for Today */}
            <LogsTable
              title="Logs for today"
              subTitle={new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              onPressTitleRightButton={() =>
                navigation.navigate("Tabs", { screen: "Logs" })
              }
              rowsData={logsForToday}
            />
            {/* Weekly SnapShotes */}
            <VStack
              borderWidth={1}
              borderColor="$primaryIndigo10"
              borderRadius={10}
              px="$4"
              py="$5"
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
                    weeklyAverage={weeklyBslData.getWeeklyBSLData.weeklyAverage}
                  />
                )}
              </HStack>
            </VStack>
          </VStack>
        )}
        <View h={100} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
