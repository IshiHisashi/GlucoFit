import {
  Center,
  HStack,
  ScrollView,
  Text,
  RefreshControl,
  Heading,
  View,
  Box,
  Image,
  VStack,
  Pressable,
  set,
  FlatList,
} from "@gluestack-ui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import GlucoButton from "../atoms/GlucoButton";
import {
  AngleRightCustom,
  BookmarkCustom,
  CapsuleCustom,
  HeartbeatCustom,
  RestaurantCustom,
} from "../svgs/svgs";
import HeaderBasic from "../headers/HeaderBasic";
import InsightCard from "../molcules/InsightCard";
import { AppStackParamList } from "../../types/navigation";
import Tab from "../atoms/Tab";
import GlucoButtonNoOutline from "../atoms/GlucoButtonNoOutline";

// hardcode for now
const userId = "670de7a6e96ff53059a49ba8";

type FilterType = "All" | "Favorite" | "Food" | "Medication" | "Wellness";

const GET_RECENT_ARTICLES = gql`
  query GetUserArticlesPagination(
    $userId: ID!
    $cursor: String
    $limit: Int
    $classification: String
  ) {
    getUserArticlesPagination(
      userId: $userId
      cursor: $cursor
      limit: $limit
      classification: $classification
    ) {
      edges {
        article_genre
        article_name
        article_thumbnail_address
        article_url
        id
        isFavorite
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const GET_ARTICLES = gql`
  query GetAllArticlesPagination($cursor: String, $limit: Int, $userId: ID!) {
    getAllArticlesPagination(cursor: $cursor, limit: $limit, userId: $userId) {
      edges {
        article_genre
        article_name
        article_thumbnail_address
        article_url
        id
        isFavorite
      }
      pageInfo {
        hasNextPage
        endCursor
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

type InsightsScreenNavigationProps =
  NativeStackNavigationProp<AppStackParamList>;

const InsightsScreen: React.FC = () => {
  const navigation = useNavigation<InsightsScreenNavigationProps>();
  const route = useRoute<{ key: string; name: string }>();

  // test pull down refresh
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // fetching data would be here instead of setTimeout
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [articles, setArticles] = useState<any[]>([]);
  const [articlesToShow, setArticlesToShow] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const [currentFilter, setCurrentFilter] = useState<FilterType>("All");

  const screenWidth = Dimensions.get("window").width;
  const itemWidth = (screenWidth - 48) / 2;

  const {
    data: recentArticlesData,
    loading: recentArticlesLoading,
    error: recentArticlesError,
    refetch: recentArticlesRefetch,
  } = useQuery(GET_RECENT_ARTICLES, {
    variables: {
      userId: userId,
      limit: 5,
      cursor: "",
      classification: "recent",
    },
  });
  recentArticlesData &&
    console.log("recent:", recentArticlesData.getUserArticlesPagination);

  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
    refetch: articlesRefetch,
    fetchMore: articlesFetchMore,
  } = useQuery(GET_ARTICLES, {
    variables: {
      limit: 10,
      cursor: null,
      userId: userId,
    },
    onCompleted: (data) => {
      if (data?.getAllArticlesPagination && isInitialLoad) {
        // setArticles((prevArticles) => [
        //   ...prevArticles,
        //   ...data.getAllArticlesPagination.edges,
        // ]);
        setArticles(data.getAllArticlesPagination.edges);
        setHasMore(data.getAllArticlesPagination.pageInfo.hasNextPage);
        setEndCursor(data.getAllArticlesPagination.pageInfo.endCursor);
        setIsInitialLoad(false);
      }
    },
  });
  articlesData &&
    console.log(
      "END CURSOR:",
      articlesData.getAllArticlesPagination.pageInfo.endCursor
    );

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
    if (!hasMore || articlesLoading || !endCursor || isInitialLoad) return;

    try {
      const res = await articlesFetchMore({
        variables: {
          limit: 10,
          cursor: endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;

          return {
            getAllArticlesPagination: {
              edges: [
                ...previousResult.getAllArticlesPagination.edges,
                ...fetchMoreResult.getAllArticlesPagination.edges,
              ],
              pageInfo: fetchMoreResult.getAllArticlesPagination.pageInfo,
              __typename: previousResult.getAllArticlesPagination.__typename,
            },
          };
        },
      });
      if (res.data?.getAllArticlesPagination) {
        setArticles((prevArticles) => [
          ...prevArticles,
          ...res.data.getAllArticlesPagination.edges,
        ]);
        setEndCursor(res.data.getAllArticlesPagination.pageInfo.endCursor);
        setHasMore(res.data.getAllArticlesPagination.pageInfo.hasNextPage);
      }
    } catch (error) {
      console.log("Error loading more articles:", error);
    }
  }, [
    hasMore,
    articlesLoading,
    articlesFetchMore,
    endCursor,
    setEndCursor,
    isInitialLoad,
  ]);

  const handleEndReached = useCallback(() => {
    loadMoreArticles();
  }, [loadMoreArticles]);

  const openArticle = (url: string, title: string) => {
    navigation.navigate("Article", {
      url,
      title,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View>
        <View>
          <HeaderBasic
            routeName={route.name as "Insights"}
            searchValue={""}
            onChangeSearchValue={() => {}}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bg="$neutralWhite"
          >
            <HStack space="sm" p="$4" pt={1}>
              <Tab
                text="All"
                isFocused={currentFilter === "All"}
                isDisabled={false}
                onPress={() => setCurrentFilter("All")}
              />
              <Tab
                text="Favorite"
                isFocused={currentFilter === "Favorite"}
                isDisabled={false}
                onPress={() => setCurrentFilter("Favorite")}
                iconLeft={BookmarkCustom}
              />
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
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={({ nativeEvent }) => {
            const { layoutMeasurement, contentOffset, contentSize } =
              nativeEvent;
            const paddingToBottom = 20;
            if (
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - paddingToBottom
            ) {
              handleEndReached();
            }
          }}
          scrollEventThrottle={400}
          bg="$neutralDark5"
        >
          {/* contents for "All" tab */}
          {currentFilter === "All" && (
            <>
              <View>
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  p="$4"
                >
                  <Text fontSize={17} fontFamily="$bold" color="$neutralDark90">
                    Recent Insights
                  </Text>
                  <GlucoButtonNoOutline
                    text="Show more"
                    isFocused={false}
                    isDisabled={false}
                    onPress={() => navigation.navigate("RecentInsights")}
                    iconRight={AngleRightCustom}
                    styleForHstack={{ gap: 1 }}
                    styleForText={{ fontFamily: "$regular", fontSize: 12 }}
                  />
                </HStack>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  p="$4"
                  pt={0}
                >
                  <HStack space="md">
                    {recentArticlesData &&
                      recentArticlesData.getUserArticlesPagination.edges.map(
                        (obj: any) => (
                          <InsightCard
                            key={obj.id}
                            title={obj.article_name}
                            category={obj.article_genre}
                            image={obj.article_thumbnail_address}
                            width={250}
                            height={150}
                            onPressBookmark={() =>
                              toggleFavouriteArticle({
                                variables: { userId, articleId: obj.id },
                              })
                            }
                            onPressCard={() =>
                              openArticle(obj.article_url, obj.article_name)
                            }
                            isFavourite={obj.isFavorite}
                          />
                        )
                      )}
                    <View w={20} />
                  </HStack>
                </ScrollView>
              </View>

              <View p="$4">
                <Text fontSize={17} fontFamily="$bold" color="$neutralDark90">
                  Explore
                </Text>

                <Box flexDirection="row" flexWrap="wrap" gap="$4" mt="$4">
                  {articles.length > 0 &&
                    articles.map((obj: any) => (
                      <InsightCard
                        key={obj.id}
                        title={obj.article_name}
                        category={obj.article_genre}
                        image={obj.article_thumbnail_address}
                        width={itemWidth}
                        height={120}
                        onPressBookmark={() =>
                          toggleFavouriteArticle({
                            variables: { userId, articleId: obj.id },
                          })
                        }
                        onPressCard={() =>
                          openArticle(obj.article_url, obj.article_name)
                        }
                        isFavourite={obj.isFavorite}
                      />
                    ))}
                </Box>
              </View>
            </>
          )}

          {/* contents for other tabs */}
          {currentFilter !== "All" && (
            <View p="$4">
              <Box flexDirection="row" flexWrap="wrap" gap="$4">
                {articlesToShow.length > 0 &&
                  articlesToShow.map((obj: any) => (
                    <InsightCard
                      key={obj.id}
                      title={obj.article_name}
                      category={obj.article_genre}
                      image={obj.article_thumbnail_address}
                      width={itemWidth}
                      height={120}
                      onPressBookmark={() =>
                        toggleFavouriteArticle({
                          variables: { userId, articleId: obj.id },
                        })
                      }
                      onPressCard={() =>
                        openArticle(obj.article_url, obj.article_name)
                      }
                      isFavourite={obj.isFavorite}
                    />
                  ))}
              </Box>
            </View>
          )}
          <View h={120} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default InsightsScreen;
