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
} from "@gluestack-ui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import GlucoButton from "../atoms/GlucoButton";
import { Box } from "@gluestack-ui/themed";
import { FlatList } from "@gluestack-ui/themed";
import { SectionList } from "@gluestack-ui/themed";

// hardcode for now
const userId = "670de7a6e96ff53059a49ba8";

const GET_COMBINED_LOGS = gql`
  query GetCombinedLogs($userId: ID!, $startDate: Date!, $endDate: Date!) {
    getCombinedLogsByDateRange(
      user_id: $userId
      startDate: $startDate
      endDate: $endDate
    ) {
      hasMoreData
      logs {
        ... on GlucoseLog {
          bsl
          log_timestamp
        }
        ... on ActivityLog {
          duration
          log_timestamp
        }
        ... on DietLog {
          calorieTaken
          log_timestamp
        }
        ... on MedicineLog {
          amount
          log_timestamp
        }
      }
    }
  }
`;

const LogsScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const [logs, setLogs] = useState([]);
  const [groupedLogs, setGroupedLogs] = useState([]);
  const [endDate, setEndDate] = useState(new Date());
  const [hasMore, setHasMore] = useState(true);

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
  data && console.log(data);

  useEffect(() => {
    const grouped = logs.reduce((acc, cur) => {
      const date = new Date(cur.log_timestamp).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(cur);
      return acc;
    }, {});

    const sections = Object.keys(grouped).map((date) => ({
      title: date,
      data: grouped[date],
    }));

    setGroupedLogs(
      sections.sort((a, b) => new Date(b.title) - new Date(a.title))
    );
  }, [logs]);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  const renderSectionHeader = ({ section: { title } }) => (
    <Box bg="gray.100" p={2}>
      <Text fontWeight="bold">{title}</Text>
    </Box>
  );

  const renderLogItem = ({ item }) => (
    <Box p={2} borderBottomWidth={1} borderBottomColor="gray.200">
      <Text>{new Date(item.log_timestamp).toLocaleString()}</Text>
      {item.__typename === "GlucoseLog" && (
        <Text>Glucose: {item.bsl} mmol/L</Text>
      )}
      {item.__typename === "ActivityLog" && (
        <Text>
          Activity: {item.duration} minutes, {item.footsteps} steps
        </Text>
      )}
      {item.__typename === "DietLog" && (
        <Text>Diet: {item.calorieTaken} calories</Text>
      )}
      {item.__typename === "MedicineLog" && (
        <Text>Medicine: {item.amount} units</Text>
      )}
    </Box>
  );

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space="sm">
          <GlucoButton
            text="All"
            isDisabled={false}
            onPress={() => console.log("pressed")}
          />
          <GlucoButton
            text="Glucose"
            isDisabled={false}
            onPress={() => console.log("pressed")}
          />
          <GlucoButton
            text="Activity"
            isDisabled={false}
            onPress={() => console.log("pressed")}
          />
          <GlucoButton
            text="Food"
            isDisabled={false}
            onPress={() => console.log("pressed")}
          />
          <GlucoButton
            text="Medicine"
            isDisabled={false}
            onPress={() => console.log("pressed")}
          />
        </HStack>
      </ScrollView>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VStack flex={1}>
          <Text fontSize="$xl" fontWeight="bold" p={4}>
            Logs
          </Text>
          {groupedLogs.length > 0 ? (
            <SectionList
              sections={groupedLogs}
              keyExtractor={(item, index) => item.log_timestamp + index}
              renderItem={renderLogItem}
              renderSectionHeader={renderSectionHeader}
              onEndReached={loadMoreLogs}
              onEndReachedThreshold={0.1}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          ) : loading ? (
            <Spinner size="large" />
          ) : (
            <Text p={4}>No logs found</Text>
          )}
        </VStack>
      </ScrollView>
    </View>
  );
};

export default LogsScreen;
