import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  HStack,
  RefreshControl,
  ScrollView,
  set,
  Spinner,
  View,
  VStack,
  Text,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Animated, Dimensions } from "react-native";

import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import GlucoButton from "../../atoms/GlucoButton";
import { AppStackParamList } from "../../../types/navigation";
import InsightCard from "../../molcules/InsightCard";
import Tab from "../../atoms/Tab";
import {
  CapsuleCustom,
  HeartbeatCustom,
  RestaurantCustom,
} from "../../svgs/svgs";
import { AuthContext } from "../../../context/AuthContext";

type FilterType = "All" | "Favorite" | "Food" | "Medication" | "Wellness";

const GET_RECENT_ARTICLES = gql`
  query GetRecentArticles(
    $userId: ID!
    $limit: Int
    $cursor: String
    $classification: String
  ) {
    getUserArticlesPagination(
      userId: $userId
      limit: $limit
      cursor: $cursor
      classification: $classification
    ) {
      edges {
        id
        article_genre
        article_url
        article_thumbnail_address
        article_name
        article_desc
        isFavorite
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const TOGGLE_FAVOURITE = gql`
  mutation ToggleFavouriteArticle($userId: ID!, $articleId: ID!) {
    toggleFavouriteArticle(userId: $userId, articleId: $articleId) {
      message
      badge {
        id
        badge_name
        badge_desc
        badge_image_address
        criteria {
          value
          comparison
          kind
          note
        }
        last_updated
      }
    }
  }
`;

type RecentInsightsScreenNavigationProps =
  NativeStackNavigationProp<AppStackParamList>;

const RecentInsightsScreen: FC = () => {
  const navigation = useNavigation<RecentInsightsScreenNavigationProps>();
  const { userId } = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);

  const [articles, setArticles] = useState<any[]>([]);
  const [articlesToShow, setArticlesToShow] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const [currentFilter, setCurrentFilter] = useState<FilterType>("All");

  const { data, loading, error, refetch, fetchMore } = useQuery(
    GET_RECENT_ARTICLES,
    {
      variables: {
        userId: userId,
        limit: 3,
        cursor: null,
        classification: "recent",
      },
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        setArticles((prev) => [
          ...prev,
          ...data.getUserArticlesPagination.edges,
        ]);
        setHasMore(data.getUserArticlesPagination.pageInfo.hasNextPage);
        setEndCursor(data.getUserArticlesPagination.pageInfo.endCursor);
      },
    }
  );
  data && console.log("data:", data.getUserArticlesPagination);
  console.log("endCursor:", endCursor);

  const [toggleFavouriteArticle] = useMutation(TOGGLE_FAVOURITE);

  useEffect(() => {
    const filteredArticles = articles.filter((obj) => {
      switch (currentFilter) {
        case "Food":
          return obj.article_genre === "Food";
        case "Medication":
          return obj.article_genre === "Medication";
        case "Wellness":
          return obj.article_genre === "Wellness";
        default:
          return true;
      }
    });
    setArticlesToShow(filteredArticles);
  }, [articles, currentFilter]);

  const loadMoreArticles = useCallback(async () => {
    if (!hasMore || loading || !endCursor) return;

    try {
      const res = await fetchMore({
        variables: {
          limit: 3,
          cursor: endCursor,
        },
      });
      setArticles((prev) => [
        ...prev,
        ...res.data.getUserArticlesPagination.edges,
      ]);
      setHasMore(res.data.getUserArticlesPagination.pageInfo.hasNextPage);
      setEndCursor(res.data.getUserArticlesPagination.pageInfo.endCursor);
    } catch (error) {
      console.log("Error loading more articles:", error);
    }
  }, [hasMore, loading, fetchMore, endCursor, setEndCursor]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      const res = await refetch({
        userId: userId,
        limit: 3,
        cursor: null,
        classification: "recent",
      });
      setArticles(res.data.getUserArticlesPagination.edges);
      setEndCursor(res.data.getUserArticlesPagination.pageInfo.endCursor);
      setHasMore(res.data.getUserArticlesPagination.pageInfo.hasNextPage);
    } catch (error) {
      console.log("Error refreshing articles:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const openArticle = (url: string, title: string) => {
    navigation.navigate("Article", {
      url,
      title,
    });
  };

  const renderArticle = ({ item }) => (
    <InsightCard
      key={item.id}
      title={item.article_name}
      category={item.article_genre}
      description={item.article_desc}
      image={item.article_thumbnail_address}
      height={180}
      onPressBookmark={() =>
        toggleFavouriteArticle({
          variables: { userId, articleId: item.id },
          refetchQueries: [
            {
              query: GET_RECENT_ARTICLES,
              variables: {
                userId: userId,
                limit: 5,
                cursor: null,
                classification: "recent",
              },
              fetchPolicy: "network-only",
            },
          ],
          awaitRefetchQueries: true,
        })
      }
      onPressCard={() => openArticle(item.article_url, item.article_name)}
      isFavourite={item.isFavorite}
    />
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
            // transform: [{ translateY: headerTranslate }],
          }}
        >
          <HeaderWithBackButton
            navigation={navigation}
            text="Recent Insights"
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
              {/* <Tab
                text="Favorite"
                isFocused={currentFilter === "Favorite"}
                isDisabled={false}
                onPress={() => setCurrentFilter("Favorite")}
                iconLeft={BookmarkCustom}
              /> */}
              <Tab
                text="Food"
                isFocused={currentFilter === "Food"}
                isDisabled={false}
                onPress={() => setCurrentFilter("Food")}
                iconLeft={RestaurantCustom}
              />
              <Tab
                text="Medication"
                isFocused={currentFilter === "Medication"}
                isDisabled={false}
                onPress={() => setCurrentFilter("Medication")}
                iconLeft={CapsuleCustom}
              />
              <Tab
                text="Wellness"
                isFocused={currentFilter === "Wellness"}
                isDisabled={false}
                onPress={() => setCurrentFilter("Wellness")}
                iconLeft={HeartbeatCustom}
              />
            </HStack>
          </ScrollView>
        </Animated.View>

        <VStack p="$4">
          {articlesToShow.length > 0 ? (
            <FlatList
              data={articlesToShow}
              keyExtractor={(item) => item.id}
              renderItem={renderArticle}
              contentContainerStyle={{ gap: 16, paddingTop: 140 }}
              onEndReached={loadMoreArticles}
              onEndReachedThreshold={0.1}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              // ListFooterComponent={() => <View h={200} />}
            />
          ) : loading ? (
            <Spinner size="large" />
          ) : (
            <Text>No logs found</Text>
          )}
        </VStack>
      </View>
    </SafeAreaView>
  );
};

export default RecentInsightsScreen;
