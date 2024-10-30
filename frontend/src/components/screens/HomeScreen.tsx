import {
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  Icon,
  MoonIcon,
  Pressable,
  Text,
  VStack,
  ChevronRightIcon,
  ScrollView,
  View,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
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
import {
  AnalysisCustom,
  AngleRightCustom,
  BellCustom,
  CapsuleDark,
  HeartrateDark,
  TimesCustom,
} from "../svgs/svgs";
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
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<{ key: string; name: string; params: RouteParams }>();
  console.log(route.name);

  const { width } = useWindowDimensions();

  const toast = useToast();

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

  useEffect(() => {
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
  }, [route.params?.insight, toast, navigation, route.params?.mutatedLog]);

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

  return (
    <SafeAreaView>
      <ScrollView>
        <HeaderBasic
          routeName={route.name as "Home"}
          userName={userData?.getUser.name}
        />
        <VStack p="$4" space="md">
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
            borderColor="$borderLight200"
            borderRadius="$md"
            p="$2"
          >
            <HStack alignItems="center" justifyContent="space-between" p="$2">
              <Text>
                {weeklyBslData
                  ? weeklyBslData.getWeeklyBSLData.dateRange
                  : "N/A"}
              </Text>
              <GlucoButtonNoOutline
                text="See more"
                isFocused={false}
                isDisabled={false}
                onPress={() => navigation.navigate("Tabs", { screen: "Logs" })}
                iconRight={AngleRightCustom}
                styleForHstack={{ gap: 1 }}
                styleForText={{ fontFamily: "$regular" }}
              />
            </HStack>

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
                <Text>mg/dL</Text>
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
