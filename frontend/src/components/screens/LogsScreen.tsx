import {
  Center,
  HStack,
  Pressable,
  RefreshControl,
  ScrollView,
  Spinner,
  Text,
  View,
  VStack,
  Box,
  FlatList,
  Icon,
} from "@gluestack-ui/themed";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { gql, useQuery } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Animated } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import GlucoButton from "../atoms/GlucoButton";
import HeaderBasic from "../headers/HeaderBasic";
import Tab from "../atoms/Tab";
import {
  AnalysisCustom,
  CapsuleCustom,
  HeartrateCustom,
  RestaurantCustom,
  TearCustom,
} from "../svgs/svgs";
import {
  IconForActivityLog,
  IconForFoodLog,
  IconForGlucoseLogHappy,
  IconForGlucoseLogNeutral,
  IconForGlucoseLogSad,
  IconForMedicineLog,
} from "../svgs/svgsForLogsTableIcons";
import { AppStackParamList } from "../../types/navigation";
import LogsTable from "../organisms/LogsTable";
import { AuthContext } from "../../context/AuthContext";

interface BaseLog {
  id: string;
  log_timestamp: string;
}

interface TestResults extends BaseLog {
  __typename: "TestResults";
  bsl: number;
}

interface ActivityLogs extends BaseLog {
  __typename: "ActivityLogs";
  duration: number;
  footsteps?: number;
}

interface DietLog extends BaseLog {
  __typename: "DietLog";
  carbs: number;
}

interface MedicineLog extends BaseLog {
  __typename: "MedicineLog";
  amount: number;
  medicine_id: {
    unit: string;
    medicine_name: string;
  };
}

type Log = TestResults | ActivityLogs | DietLog | MedicineLog;

interface RowData {
  __typename?: string;
  id: string;
  icon: any;
  text: string;
  subText: string;
  value: string | number;
  unit?: string;
  onPressRow?: () => void;
  log_timestamp: string;
}

interface GroupedLogs {
  // [date: string]: Log[];
  [date: string]: RowData[];
}

interface Section {
  title: string;
  // data: Log[];
  data: RowData[];
}

type FilterType = "All" | "Glucose" | "Activity" | "Food" | "Medicine";

type LogsScreenNavigationProp = NativeStackNavigationProp<AppStackParamList>;

const GET_COMBINED_LOGS = gql`
  query GetCombinedLogs(
    $userId: ID!
    $goBackTillThisDate: Date!
    $latestDate: Date!
  ) {
    getCombinedLogsByDateRange(
      user_id: $userId
      goBackTillThisDate: $goBackTillThisDate
      latestDate: $latestDate
    ) {
      hasMoreData
      logs {
        ... on TestResults {
          bsl
          id
          log_timestamp
        }
        ... on ActivityLogs {
          duration
          footsteps
          id
          log_timestamp
        }
        ... on DietLog {
          carbs
          id
          log_timestamp
        }
        ... on MedicineLog {
          amount
          id
          log_timestamp
          medicine_id {
            unit
            medicine_name
          }
        }
      }
      nextLatestDate
    }
  }
`;

const GET_AVERAGE_BSL_FOR_X = gql`
  query GetAverageBslForX($userId: ID!) {
    getAverageBslXAxisValue(user_id: $userId)
  }
`;

const LogsScreen: React.FC = () => {
  const navigation = useNavigation<LogsScreenNavigationProp>();
  const route = useRoute<{ key: string; name: string }>();
  const { userId } = useContext(AuthContext);

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

  // animation for header //////////////////////////
  const HEADER_HIGHT = 120;

  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, HEADER_HIGHT],
        outputRange: [0, HEADER_HIGHT],
        extrapolateLeft: "clamp",
      }),
      offsetAnim
    ),
    0,
    HEADER_HIGHT
  );
  let clampedScrollValue = 0;
  let offsetValue = 0;
  let scrollValue = 0;
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - scrollValue;
      scrollValue = value;
      clampedScrollValue = Math.min(
        Math.max(clampedScrollValue * diff, 0),
        HEADER_HIGHT
      );
    });
    offsetAnim.addListener(({ value }) => {
      offsetValue = value;
    });
  }, []);
  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADER_HIGHT],
    outputRange: [0, -HEADER_HIGHT],
    extrapolate: "clamp",
  });
  // animation for header end ////////////////////////////////

  const [refreshing, setRefreshing] = useState(false);

  const [logs, setLogs] = useState<Log[]>([]);
  const [sectionedLogs, setSectionedLogs] = useState<Section[]>([]);
  const [latestDate, setLatestDate] = useState<Date>(() => new Date());
  const [hasMore, setHasMore] = useState(true);

  const [currentFilter, setCurrentFilter] = useState<FilterType>("All");

  const { data, loading, error, refetch, fetchMore } = useQuery(
    GET_COMBINED_LOGS,
    {
      variables: {
        userId: userId,
        goBackTillThisDate: new Date(
          latestDate.getTime() - 30 * 24 * 60 * 60 * 1000
        ).toISOString(), // 30 days before latestDate
        latestDate: latestDate.toISOString(),
        // goBackTillThisDate: "2024-10-01T05:32:18.789+00:00",
        // latestDate: "2024-10-25T05:32:18.789+00:00",
      },
      onCompleted: (data) => {
        if (!hasMore) return;
        setLogs((prevLogs) => [
          ...prevLogs,
          ...data.getCombinedLogsByDateRange.logs,
        ]);
        setHasMore(data.getCombinedLogsByDateRange.hasMoreData);
        setLatestDate(new Date(data.getCombinedLogsByDateRange.nextLatestDate));
      },
    }
  );
  data && console.log("LOGS:", data.getCombinedLogsByDateRange);

  const {
    data: bslForXData,
    loading: bslForXLoading,
    error: bslForXError,
    refetch: bslForXRefetch,
  } = useQuery(GET_AVERAGE_BSL_FOR_X, {
    variables: { userId: userId },
  });

  useEffect(() => {
    if (logs) {
      // process logs to fit logs table component
      const processedLogs = logs.map((obj) => {
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
              __typename: obj.__typename,
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
              log_timestamp: obj.log_timestamp,
            };
          }
          case "ActivityLogs":
            return {
              __typename: obj.__typename,
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
              log_timestamp: obj.log_timestamp,
            };
          case "MedicineLog":
            return {
              __typename: obj.__typename,
              id: obj.id,
              icon: <IconForMedicineLog />,
              text: `Medicine - ${obj.medicine_id.medicine_name}`,
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
              log_timestamp: obj.log_timestamp,
            };
          case "DietLog":
            return {
              __typename: obj.__typename,
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
              log_timestamp: obj.log_timestamp,
            };
          // default:
          //   return true;
        }
      });

      // filter by currently selected chip
      const filteredLogs = processedLogs.filter((log) => {
        switch (currentFilter) {
          case "Glucose":
            return log.__typename === "TestResults";
          case "Activity":
            return log.__typename === "ActivityLogs";
          case "Food":
            return log.__typename === "DietLog";
          case "Medicine":
            return log.__typename === "MedicineLog";
          default:
            return true;
        }
      });

      // group the data by date and create a big object
      // the key is the date and the value is an array of logs on that day
      const grouped = filteredLogs.reduce((acc: any, cur: RowData) => {
        const date = new Date(cur.log_timestamp).toDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(cur);
        return acc;
      }, {});

      // create an array of objects containing date and logs on that day
      // each object has a field for title (date) and data (logs on that day)
      const sections: Section[] = Object.keys(grouped).map((date) => ({
        title: date,
        data: grouped[date],
      }));

      // sort logs in ascending order within each section
      sections.forEach((obj) => {
        obj.data.sort((obj1, obj2) => {
          if (new Date(obj1.log_timestamp) < new Date(obj2.log_timestamp)) {
            return -1;
          } else if (
            new Date(obj1.log_timestamp) > new Date(obj2.log_timestamp)
          ) {
            return 1;
          } else {
            return 0;
          }
        });
      });

      // sort sections in descending order and set
      setSectionedLogs(
        sections.sort((obj1, obj2) => {
          if (new Date(obj1.title) > new Date(obj2.title)) {
            return -1;
          } else if (new Date(obj1.title) < new Date(obj2.title)) {
            return 1;
          } else {
            return 0;
          }
        })
      );
    }
  }, [logs, bslForXData?.getAverageBslXAxisValue, navigation, currentFilter]);

  const loadMoreLogs = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      const res = await fetchMore({
        variables: {
          userId: userId,
          goBackTillThisDate: new Date(
            latestDate.getTime() - 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          latestDate: latestDate.toISOString(),
        },
      });

      if (res.data.getCombinedLogsByDateRange.logs.length === 0) {
        setHasMore(false);
        return;
      }

      setLogs((prev) => [...prev, ...res.data.getCombinedLogsByDateRange.logs]);
      setHasMore(res.data.getCombinedLogsByDateRange.hasMoreData);
      if (res.data.getCombinedLogsByDateRange.nextLatestDate) {
        setLatestDate(
          new Date(res.data.getCombinedLogsByDateRange.nextLatestDate)
        );
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error loading more logs:", error);
      setHasMore(false);
    }
  }, [hasMore, loading, fetchMore, latestDate]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      const now = new Date();
      setLatestDate(now);
      setLogs([]);

      const result = await refetch({
        userId: userId,
        goBackTillThisDate: new Date(
          now.getTime() - 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        latestDate: now.toISOString(),
      });

      setLogs(result.data.getCombinedLogsByDateRange.logs);
      setHasMore(result.data.getCombinedLogsByDateRange.hasMoreData);
      if (result.data.getCombinedLogsByDateRange.nextLatestDate) {
        setLatestDate(
          new Date(result.data.getCombinedLogsByDateRange.nextLatestDate)
        );
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error refreshing data: ", error);
      setHasMore(false);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const renderLogItem = ({ item }: { item: Section }) => {
    console.log("item:", item);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return (
      <LogsTable
        title={
          new Date(item.title).toLocaleDateString() ===
          today.toLocaleDateString()
            ? "Today"
            : new Date(item.title).toLocaleDateString() ===
                yesterday.toLocaleDateString()
              ? "Yesterday"
              : new Date(item.title).toLocaleString("en-US", {
                  weekday: "long",
                })
        }
        subTitle={new Date(item.title).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
        rowsData={item.data}
        tableType="logs"
        styleForLogsContainer={{ margin: 16, marginTop: 20, marginBottom: 0 }}
      />
    );
  };

  console.log("sectionedLogs:", sectionedLogs);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View h="106%" bg="$neutralDark5">
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: HEADER_HIGHT,
            zIndex: 1000,
            elevation: 1000,
            backgroundColor: "$neutralWhite",
            // transform: [{ translateY: headerTranslate }],
            // paddingTop: insets.top,
          }}
        >
          <HeaderBasic routeName={route.name as "Logs"} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bg="$neutralWhite"
          >
            <HStack space="sm" p="$4" pt="$2">
              <Tab
                text="All"
                isFocused={currentFilter === "All"}
                isDisabled={false}
                onPress={() => setCurrentFilter("All")}
              />
              <Tab
                text="Glucose"
                isFocused={currentFilter === "Glucose"}
                isDisabled={false}
                onPress={() => setCurrentFilter("Glucose")}
                iconLeft={TearCustom}
              />
              <Tab
                text="Activity"
                isFocused={currentFilter === "Activity"}
                isDisabled={false}
                onPress={() => setCurrentFilter("Activity")}
                iconLeft={HeartrateCustom}
              />
              <Tab
                text="Food"
                isFocused={currentFilter === "Food"}
                isDisabled={false}
                onPress={() => setCurrentFilter("Food")}
                iconLeft={RestaurantCustom}
              />
              <Tab
                text="Medicine"
                isFocused={currentFilter === "Medicine"}
                isDisabled={false}
                onPress={() => setCurrentFilter("Medicine")}
                iconLeft={CapsuleCustom}
              />
            </HStack>
          </ScrollView>
        </Animated.View>

        {sectionedLogs.length > 0 ? (
          <AnimatedFlatList
            data={sectionedLogs}
            keyExtractor={(item, index) => item.log_timestamp + index}
            renderItem={renderLogItem}
            onEndReached={loadMoreLogs}
            onEndReachedThreshold={0.1}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={() => <View h={30} />}
            contentContainerStyle={{ paddingTop: HEADER_HIGHT }}
            // onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
          />
        ) : loading ? (
          <Spinner size="large" />
        ) : (
          <Text>No logs found</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LogsScreen;
