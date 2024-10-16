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
} from "@gluestack-ui/themed";
import React, { useCallback } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { gql, useQuery } from "@apollo/client";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BslLineChart from "../organisms/BslLineChart";
import BslWeeklyBarChart from "../organisms/BslWeeklyBarChart";
import { AppStackParamList } from "../../types/navigation";
import { CapsuleDark, HeartrateDark } from "../svgs/svgs";

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
      log_date
    }
  }
`;

const GET_MEDICINES_FOR_TODAY = gql`
  query GetMedicinesForToday($userId: ID!) {
    getTodayMedicineLogs(user_id: $userId) {
      log_timestamp
      amount
    }
  }
`;

const GET_CARBS_FOR_TODAY = gql`
  query GetCarbsForToday($userId: ID!) {
    getTodayDietLogs(userID: $userId) {
      carbs
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

type HomeScreenNavigationProp = NativeStackNavigationProp<AppStackParamList>;

type RouteParams = {
  mutatedLog?: string;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<{ key: string; name: string; params: RouteParams }>();

  const { width } = useWindowDimensions();

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

  useFocusEffect(
    useCallback(() => {
      if (route.params?.mutatedLog === "bsl") {
        bslResultsAndAverageRefetch();
        weeklyBslRefetch();
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
    // activitiesData &&
    medicinesData &&
    carbsData
  ) {
    logsForToday = [
      ...bslResultsAndAverageData.getTestResultsAndAverageForToday.testResults,
      // ...activitiesData.getTodayActivityLogs,
      ...medicinesData.getTodayMedicineLogs,
      ...carbsData.getTodayDietLogs,
    ];

    logsForToday.length > 1 &&
      logsForToday.sort((obj1, obj2) => {
        if (obj1.log_timestamp < obj2.log_timestamp) {
          return -1;
        } else if (obj1.log_timestamp > obj2.log_timestamp) {
          return 1;
        } else {
          return 0;
        }
      });
    console.log("sorted:", logsForToday);
  }

  return (
    <ScrollView>
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
                  <Text fontSize="$4xl" fontWeight="$bold">
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
            <BslLineChart
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

        {/* will be replaced by log table component ---------------------------------- */}
        <VStack
          borderWidth={1}
          borderColor="$borderLight200"
          borderRadius="$md"
          p="$2"
        >
          <HStack alignItems="center" justifyContent="space-between" p="$2">
            <Text fontSize="$lg" fontWeight="$bold">
              Logs for today
            </Text>
            <Pressable
              onPress={() => navigation.navigate("Tabs", { screen: "Logs" })}
            >
              <HStack alignItems="center" space="xs">
                <Text>See more</Text>
                <Icon as={ChevronRightIcon} size="sm" mr="$2" />
              </HStack>
            </Pressable>
          </HStack>

          {logsForToday &&
            logsForToday.map((obj, index) => (
              <Pressable onPress={() => {}} key={index}>
                <HStack justifyContent="space-between" p="$2">
                  <HStack alignItems="center" space="sm">
                    <Box
                      width={40}
                      height={40}
                      borderRadius="$full"
                      bg="#E0E0E0"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {obj.__typename === "TestResults" && (
                        <Icon as={MoonIcon} size="md" />
                      )}
                      {obj.__typename === "ActivityLog" && (
                        <Icon as={HeartrateDark} size="md" />
                      )}
                      {obj.__typename === "MedicineLog" && (
                        <Icon as={CapsuleDark} size="md" />
                        // <CapsuleDark />
                      )}
                      {obj.__typename === "DietLog" && (
                        <Icon as={MoonIcon} size="md" />
                      )}
                    </Box>
                    <VStack space="xs">
                      <Text fontWeight="$bold">
                        {obj.__typename === "TestResults" && "Blood Glucose"}
                        {obj.__typename === "ActivityLog" && "Activity"}
                        {obj.__typename === "MedicineLog" && "Medicine"}
                        {obj.__typename === "DietLog" && "Carbs"}
                      </Text>
                      <Text>
                        {new Date(obj.log_timestamp).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack alignItems="center" space="xs">
                    {obj.__typename === "TestResults" && (
                      <>
                        <Text size="3xl" fontWeight="$bold">
                          {obj.bsl}
                        </Text>
                        <Text>mmol/L</Text>
                      </>
                    )}
                    {obj.__typename === "ActivityLog" && (
                      <>
                        <Text size="3xl" fontWeight="$bold">
                          {obj.duration}
                        </Text>
                        <Text>mmol/L</Text>
                      </>
                    )}
                    {obj.__typename === "MedicineLog" && (
                      <>
                        <Text size="3xl" fontWeight="$bold">
                          {obj.amount}
                        </Text>
                        <Text>mg</Text>
                      </>
                    )}
                    {obj.__typename === "DietLog" && (
                      <>
                        <Text size="3xl" fontWeight="$bold">
                          {obj.carbs}
                        </Text>
                        <Text>g</Text>
                      </>
                    )}
                  </HStack>
                </HStack>
              </Pressable>
            ))}
        </VStack>
        {/* ---------------------------------------------------------------------- */}

        <VStack
          borderWidth={1}
          borderColor="$borderLight200"
          borderRadius="$md"
          p="$2"
        >
          <HStack alignItems="center" justifyContent="space-between" p="$2">
            <Text>
              {weeklyBslData ? weeklyBslData.getWeeklyBSLData.dateRange : "N/A"}
            </Text>
            <Pressable
              onPress={() => navigation.navigate("Tabs", { screen: "Logs" })}
            >
              <HStack alignItems="center" space="xs">
                <Text>See more</Text>
                <Icon as={ChevronRightIcon} size="sm" mr="$2" />
              </HStack>
            </Pressable>
          </HStack>

          <HStack alignItems="center" justifyContent="space-between" space="sm">
            <Center>
              <Text size="3xl" fontWeight="$bold">
                {weeklyBslData
                  ? weeklyBslData.getWeeklyBSLData.weeklyAverage
                  : "N/A"}
              </Text>
              <Text>mg/dL</Text>
              <Text>Average</Text>
            </Center>

            {weeklyBslData && (
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
  );
};

export default HomeScreen;
