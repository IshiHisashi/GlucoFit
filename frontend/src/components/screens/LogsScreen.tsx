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
} from "@gluestack-ui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import GlucoButton from "../atoms/GlucoButton";

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
  query GetCombinedLogs($userId: ID!, $startDate: Date!, $endDate: Date!) {
    getCombinedLogsByDateRange(
      user_id: $userId
      startDate: $startDate
      endDate: $endDate
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
    }
  }
`;

const LogsScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const [logs, setLogs] = useState<Log[]>([]);
  const [sectionedLogs, setSectionedLogs] = useState<Section[]>([]);
  const [endDate, setEndDate] = useState(new Date());
  const [hasMore, setHasMore] = useState(true);

  const [currentFilter, setCurrentFilter] = useState<FilterType>("All");

  const { data, loading, error, refetch, fetchMore } = useQuery(
    GET_COMBINED_LOGS,
    {
      variables: {
        userId: userId,
        startDate: new Date(
          endDate.getTime() - 30 * 24 * 60 * 60 * 1000
        ).toISOString(), // 30 days before endDate
        endDate: endDate.toISOString(),
        // startDate: "2024-10-01T05:32:18.789+00:00",
        // endDate: "2024-10-16T05:32:18.789+00:00",
        limit: 50,
      },
      onCompleted: (data) => {
        setLogs((prevLogs) => [
          ...prevLogs,
          ...data.getCombinedLogsByDateRange.logs,
        ]);
        setHasMore(data.getCombinedLogsByDateRange.hasMoreData);
      },
    }
  );
  data && console.log(data.getCombinedLogsByDateRange);

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

  const loadMoreLogs = useCallback(() => {
    if (!hasMore || loading) return;

    const oldestLogDate = new Date(logs[logs.length - 1].log_timestamp);
    setEndDate(oldestLogDate);

    fetchMore({
      variables: {
        endDate: oldestLogDate.toISOString(),
      },
    });
  }, [hasMore, loading, logs, fetchMore]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      const now = new Date();
      setEndDate(now);
      setLogs([]);

      const result = await refetch({
        userId: userId,
        startDate: new Date(
          now.getTime() - 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        endDate: now.toISOString(),
        limit: 50,
      });

      setLogs(result.data.getCombinedLogsByDateRange.logs);
      setHasMore(result.data.getCombinedLogsByDateRange.hasMoreData);
    } catch (error) {
      console.log("Error refreshing data: ", error);
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
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space="sm" p="$4">
          <GlucoButton
            text="All"
            isDisabled={currentFilter === "All"}
            onPress={() => setCurrentFilter("All")}
          />
          <GlucoButton
            text="Glucose"
            isDisabled={currentFilter === "Glucose"}
            onPress={() => setCurrentFilter("Glucose")}
          />
          <GlucoButton
            text="Activity"
            isDisabled={currentFilter === "Activity"}
            onPress={() => setCurrentFilter("Activity")}
          />
          <GlucoButton
            text="Food"
            isDisabled={currentFilter === "Food"}
            onPress={() => setCurrentFilter("Food")}
          />
          <GlucoButton
            text="Medicine"
            isDisabled={currentFilter === "Medicine"}
            onPress={() => setCurrentFilter("Medicine")}
          />
        </HStack>
      </ScrollView>

      {sectionedLogs.length > 0 ? (
        <SectionList
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
          ListFooterComponent={() => <View h={40} />}
        />
      ) : loading ? (
        <Spinner size="large" />
      ) : (
        <Text>No logs found</Text>
      )}
    </View>
  );
};

export default LogsScreen;
