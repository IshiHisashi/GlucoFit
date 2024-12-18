import {
  HStack,
  RefreshControl,
  ScrollView,
  Spinner,
  Text,
  View,
  FlatList,
} from "@gluestack-ui/themed";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Tab from "../atoms/Tab";
import {
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
  activityType: string;
  footsteps?: number;
}

interface DietLog extends BaseLog {
  __typename: "DietLog";
  time_period: string;
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

interface Section {
  title: string;
  data: RowData[];
}

type FilterType = "All" | "Glucose" | "Activity" | "Food" | "Medicine";

type LogsScreenNavigationProp = NativeStackNavigationProp<AppStackParamList>;

const GET_COMBINED_LOGS = gql`
  query GetCombinedLogs(
    $userId: ID!
    $goBackTillThisDate: Date!
    $latestDate: Date!
    $cursor: Date
    $limit: Int
  ) {
    getCombinedLogsByDateRange(
      user_id: $userId
      goBackTillThisDate: $goBackTillThisDate
      latestDate: $latestDate
      cursor: $cursor
      limit: $limit
    ) {
      logs {
        ... on TestResults {
          bsl
          id
          log_timestamp
        }
        ... on ActivityLogs {
          duration
          footsteps
          activityType
          id
          log_timestamp
        }
        ... on DietLog {
          carbs
          id
          time_period
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
      hasMoreData
      nextCursor
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
  const { userId } = useContext(AuthContext);
  const numPagenation = 9;
  const flatListRef = useRef<FlatList>(null);
  const logsRef = useRef<Log[]>([]);

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

  // animation for header //////////////////////////
  const HEADER_HIGHT = 70;

  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
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
  // animation for header end ////////////////////////////////

  const [refreshing, setRefreshing] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [sectionedLogs, setSectionedLogs] = useState<Section[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("All");

  const [fetchLogs, { data, loading, error, fetchMore }] =
    useLazyQuery(GET_COMBINED_LOGS);

  useEffect(() => {
    if (!userId) return;

    fetchLogs({
      variables: {
        userId,
        goBackTillThisDate: new Date(
          new Date().getTime() - 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        latestDate: new Date().toISOString(),
        cursor: null,
        limit: numPagenation,
      },
    })
      .then((response) => {
        const {
          logs: fetchedLogs,
          hasMoreData,
          nextCursor,
        } = response.data.getCombinedLogsByDateRange;

        setLogs(fetchedLogs);
        setHasMore(hasMoreData);
        setCursor(nextCursor);
      })
      .catch((err) => console.error("Error fetching logs:", err));
  }, [userId]);

  const fetchMoreLogs = async () => {
    if (!hasMore || loading) return;

    const currentOffset = scrollY.__getValue();

    await fetchMore({
      variables: {
        userId,
        goBackTillThisDate: new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        latestDate: new Date().toISOString(),
        cursor,
        limit: 5,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const {
          logs: newLogs,
          hasMoreData,
          nextCursor,
        } = fetchMoreResult.getCombinedLogsByDateRange;

        const uniqueLogs = newLogs.filter(
          (log: any) =>
            !logsRef.current.some((existingLog) => existingLog.id === log.id)
        );
        logsRef.current = [...logsRef.current, ...uniqueLogs];

        setLogs([...logs, ...uniqueLogs]);
        setHasMore(hasMoreData);
        setCursor(nextCursor);
        setTimeout(() => {
          flatListRef.current?.scrollToOffset({
            offset: currentOffset,
            animated: false,
          });
        }, 50);
      },
    });
  };

  const { data: bslForXData } = useQuery(GET_AVERAGE_BSL_FOR_X, {
    variables: { userId: userId },
  });

  const onRefresh = async () => {
    setRefreshing(true);

    await fetchLogs({
      variables: {
        userId,
        goBackTillThisDate: new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        latestDate: new Date().toISOString(),
        cursor: null, // Reset to fetch from the beginning
        limit: numPagenation,
      },
    }).then((response) => {
      const {
        logs: refreshedLogs,
        hasMoreData,
        nextCursor,
      } = response.data.getCombinedLogsByDateRange;
      if (JSON.stringify(refreshedLogs) !== JSON.stringify(logsRef.current)) {
        logsRef.current = refreshedLogs;
        setLogs(refreshedLogs);
      }
      setHasMore(hasMoreData);
      setCursor(nextCursor);
    });
    setRefreshing(false);
  };

  useEffect(() => {
    if (logs) {
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
              log_timestamp: obj.log_timestamp,
            };
          case "MedicineLog":
            return {
              __typename: obj.__typename,
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
              log_timestamp: obj.log_timestamp,
            };
          case "DietLog":
            return {
              __typename: obj.__typename,
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
              log_timestamp: obj.log_timestamp,
            };
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

      const grouped = filteredLogs.reduce((acc: any, cur: RowData) => {
        const date = new Date(cur.log_timestamp).toDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(cur);
        return acc;
      }, {});

      const sections: Section[] = Object.keys(grouped).map((date) => ({
        title: date,
        data: grouped[date],
      }));

      sections.forEach((obj) => {
        obj.data.sort((obj1, obj2) => {
          if (new Date(obj1.log_timestamp) > new Date(obj2.log_timestamp)) {
            return -1; // Newest first
          } else if (
            new Date(obj1.log_timestamp) < new Date(obj2.log_timestamp)
          ) {
            return 1; // Older last
          } else {
            return 0;
          }
        });
      });

      // Sort sections by date (newest date first)
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

  const renderLogItem = ({ item }: { item: Section }) => {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View h="100%" bg="$neutralDark5">
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
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bg="$neutralWhite"
          >
            <HStack space="sm" paddingHorizontal={20} paddingVertical={15}>
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
            ref={flatListRef}
            data={sectionedLogs}
            keyExtractor={(item: any, index) => `${item.title}-${index}`}
            renderItem={renderLogItem}
            onEndReached={fetchMoreLogs}
            // onEndReachedThreshold={0.01}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={() => <View h={30} />}
            contentContainerStyle={{ paddingTop: HEADER_HIGHT }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
            }}
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
