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
  SectionList,
  Icon,
} from "@gluestack-ui/themed";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { Animated } from "react-native";

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

// hardcode for now
const userId = "670de7a6e96ff53059a49ba8";

interface BaseLog {
  id: string;
  log_timestamp: string;
}

interface TestResults extends BaseLog {
  __typename: "TestResults";
  bsl?: number;
}

interface ActivityLogs extends BaseLog {
  __typename: "ActivityLogs";
  duration?: number;
  footsteps?: number;
}

interface DietLog extends BaseLog {
  __typename: "DietLog";
  carbs?: number;
}

interface MedicineLog extends BaseLog {
  __typename: "MedicineLog";
  amount?: number;
  medicine_id?: {
    unit?: string;
    medicine_name?: string;
  };
}

type Log = TestResults | ActivityLogs | DietLog | MedicineLog;

interface GroupedLogs {
  [date: string]: Log[];
}

interface Section {
  title: string;
  data: Log[];
}

type FilterType = "All" | "Glucose" | "Activity" | "Food" | "Medicine";

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

const LogsScreen: React.FC = () => {
  const route = useRoute<{ key: string; name: string }>();

  const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

  // animation for header //////////////////////////
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 140],
        outputRange: [0, 140],
        extrapolateLeft: "clamp",
      }),
      offsetAnim
    ),
    0,
    140
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
        140
      );
    });
    offsetAnim.addListener(({ value }) => {
      offsetValue = value;
    });
  }, []);
  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, 140],
    outputRange: [0, -140],
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

  useEffect(() => {
    // filter by currently selected chip
    const filteredLogs = logs.filter((log) => {
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

    // group the data by date
    const grouped = filteredLogs.reduce((acc: GroupedLogs, cur: Log) => {
      const date = new Date(cur.log_timestamp).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(cur);
      return acc;
    }, {});

    // create an array of objects containing date and data on that day
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
  }, [logs, currentFilter]);

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

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: Section;
  }) => (
    <HStack
      p="$2"
      pt="$8"
      justifyContent="space-between"
      alignItems="flex-end"
      borderBottomWidth={1}
    >
      <VStack space="xs">
        <Text fontSize="$lg" fontWeight="bold">
          {title}
        </Text>
        <Text>{title}</Text>
      </VStack>
      <HStack space="xs">
        <Text>mmol/L</Text>
        <Text>minutes</Text>
        <Text>g</Text>
      </HStack>
    </HStack>
  );

  const renderLogItem = ({ item }: { item: Log }) => (
    <Pressable
      onPress={() => {
        console.log(item.id);
      }}
      p="$2"
    >
      <HStack justifyContent="space-between">
        <VStack space="xs">
          <Text fontSize="$lg" fontWeight="$bold">
            {item.__typename === "TestResults" && "Glucose Level"}
            {item.__typename === "ActivityLogs" && "Activity"}
            {item.__typename === "DietLog" && "Carb"}
            {item.__typename === "MedicineLog" && "Med"}
          </Text>

          <Text>
            {new Date(item.log_timestamp).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </Text>
        </VStack>

        <Text>
          {item.__typename === "TestResults" && `${item.bsl} mmol/L`}
          {item.__typename === "ActivityLogs" &&
            `${item.duration} minutes, ${item.footsteps} steps`}
          {item.__typename === "DietLog" && `${item.carbs} g`}
          {item.__typename === "MedicineLog" &&
            `${item.amount} ${item.medicine_id.unit}`}
        </Text>
      </HStack>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 140,
            zIndex: 1000,
            elevation: 1000,
            backgroundColor: "$neutralWhite",
            transform: [{ translateY: headerTranslate }],
            // paddingTop: insets.top,
          }}
        >
          <HeaderBasic
            routeName={route.name as "Logs"}
            searchValue={""}
            onChangeSearchValue={() => {}}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bg="$neutralWhite"
          >
            <HStack space="sm" p="$4">
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
          <AnimatedSectionList
            sections={sectionedLogs}
            keyExtractor={(item, index) => item.log_timestamp + index}
            renderItem={renderLogItem}
            renderSectionHeader={renderSectionHeader}
            onEndReached={loadMoreLogs}
            onEndReachedThreshold={0.1}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            stickySectionHeadersEnabled={false}
            // ListFooterComponent={() => <View h={90} />}

            contentContainerStyle={{ paddingTop: 140 }}
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
