import React, { useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  HStack,
  Icon,
  ChevronRightIcon,
  ScrollView,
} from "@gluestack-ui/themed";
import {
  useQuery,
  useLazyQuery,
  gql,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const IP = "";

// Apollo Client Setup
const client = new ApolloClient({
  uri: `http://${IP}:3000/graphql`, // Replace with your backend IP address or hosted GraphQL endpoint
  cache: new InMemoryCache(),
});

const userId = "670db268582e7e887e447288";

// Main Query to Get User's Badges
const GET_USER_ON_PROGRESS_BADGES = gql`
  query GetUserOnProgressBadges($id: ID!) {
    getUserOnProgressBadge(id: $id) {
      badges {
        badgeId {
          id
          badge_name
          badge_desc
          badge_image_address
          criteria {
            value
            comparison
          }
        }
        achieved
      }
    }
  }
`;

// Query to Fetch Data for a Specific Badge (Streak Starter)
const QUERY_FOR_STREAK_STARTER = gql`
  query GetStreakWithThreshold {
    getStreakTestResults(
      user_id: "670702cbd3ce55c634ec740c"
      withThreshold: false
    )
  }
`;

const ProgressBudgeSection: React.FC = () => {
  // Fetch user badges using useQuery
  const { loading, error, data } = useQuery(GET_USER_ON_PROGRESS_BADGES, {
    variables: { id: userId },
  });

  // -------------------------
  // FETCH DATA TO SEE PROGRESS OF EACH BADGE
  //This is a sample for lazyquery to retrieve data conditionally (conditional fetching).
  const [loadStreakData, { data: streakData }] = useLazyQuery(
    QUERY_FOR_STREAK_STARTER
  );

  // Effect to Load Badge-Specific Data
  useEffect(() => {
    if (data?.getUserOnProgressBadge?.badges) {
      data.getUserOnProgressBadge.badges.forEach((badge: any) => {
        if (badge.badgeId.badge_name === "Streak Starter") {
          loadStreakData(); // Only load data when the "Streak Starter" badge is found
        }
      });
    }
  }, [data, loadStreakData]);
  // ---------------------------

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View
      flexDirection="column"
      gap={20}
      borderColor="#ccc"
      borderWidth={1}
      rounded={10}
      padding={10}
    >
      {/* Section header */}
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize={20} fontWeight="$semibold">
          Progress
        </Text>
        <Pressable>
          <HStack alignItems="center" space="xs">
            <Text>See more</Text>
            <Icon as={ChevronRightIcon} size="sm" mr="$2" />
          </HStack>
        </Pressable>
      </View>

      {/* Render Badge Cards */}
      <ScrollView>
        {data?.getUserOnProgressBadge?.badges.map((badge: any) => (
          <View
            key={badge.badgeId.id}
            borderColor="hotpink"
            borderWidth={1}
            p={4}
          >
            <Text>{badge.badgeId.badge_name}</Text>
            <Text fontSize={10}>{badge.badgeId.badge_desc}</Text>
            <Text>
              {/* Need conditional rendering depending on badge name */}
              {badge.badgeId.badge_name === "Streak Starter"
                ? JSON.stringify(streakData?.getStreakTestResults)
                : "tbc"}{" "}
              / {badge.badgeId.criteria.value}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const ProgressBudge: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ProgressBudgeSection />
    </ApolloProvider>
  );
};

export default ProgressBudge;
