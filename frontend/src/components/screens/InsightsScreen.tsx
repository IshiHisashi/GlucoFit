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
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Dimensions } from "react-native";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
import { AuthContext } from "../../context/AuthContext";

type FilterType = "All" | "Favorite" | "Food" | "Medication" | "Wellness";

const GET_USER_ARTICLES = gql`
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
    ) @connection(key: "getUserArticles_$classification") {
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

const GET_ALL_ARTICLES = gql`
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
  const { userId } = useContext(AuthContext);

  // test pull down refresh
  const [refreshing, setRefreshing] = useState(false);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [articles, setArticles] = useState<any[]>([]);
  const [articlesToShow, setArticlesToShow] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const [favouriteArticles, setFavouriteArticles] = useState<any[]>([]);
  const [hasMoreFavourite, setHasMoreFavourite] = useState(true);
  const [endCursorFavourite, setEndCursorFavourite] = useState<string | null>(
    null
  );

  const [currentFilter, setCurrentFilter] = useState<FilterType>("All");

  const screenWidth = Dimensions.get("window").width;
  const itemWidth = (screenWidth - 48) / 2;

  const {
    data: recentArticlesData,
    loading: recentArticlesLoading,
    error: recentArticlesError,
    refetch: recentArticlesRefetch,
  } = useQuery(GET_USER_ARTICLES, {
    variables: {
      userId: userId,
      limit: 5,
      cursor: "",
      classification: "recent",
    },
    fetchPolicy: "network-only",
  });
  recentArticlesData &&
    console.log("recent:", recentArticlesData.getUserArticlesPagination);

  const [
    getFavouriteArticles,
    {
      data: favouriteArticlesData,
      loading: favouriteArticlesLoading,
      error: favouriteArticlesError,
      refetch: favouriteArticlesRefetch,
      fetchMore: favouriteArticlesFetchMore,
    },
  ] = useLazyQuery(GET_USER_ARTICLES, {
    variables: {
      userId: userId,
      limit: 10,
      cursor: "",
      classification: "favorite",
    },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log("FAVOURITE DATA:", data);
      setFavouriteArticles(data.getUserArticlesPagination.edges);
      setHasMoreFavourite(data.getUserArticlesPagination.pageInfo.hasNextPage);
      setEndCursorFavourite(data.getUserArticlesPagination.pageInfo.endCursor);
    },
  });
  console.log("favourite:", favouriteArticlesData?.getUserArticlesPagination);

  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
    refetch: articlesRefetch,
    fetchMore: articlesFetchMore,
  } = useQuery(GET_ALL_ARTICLES, {
    variables: {
      limit: 10,
      cursor: null,
      userId: userId,
    },
    fetchPolicy: "network-only",
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    recentArticlesRefetch({
      variables: {
        userId: userId,
        limit: 5,
        cursor: "",
        classification: "recent",
      },
      fetchPolicy: "network-only",
    });
    articlesRefetch({
      variables: {
        limit: 10,
        cursor: null,
        userId: userId,
      },
      fetchPolicy: "network-only",
    });

    setRefreshing(false);
  }, [articlesRefetch, recentArticlesRefetch]);

  useFocusEffect(
    useCallback(() => {
      if (currentFilter === "Favorite") {
        getFavouriteArticles({
          variables: {
            userId: userId,
            limit: 10,
            cursor: "",
            classification: "favorite",
          },
          fetchPolicy: "network-only",
        });
      } else if (currentFilter === "All") {
        recentArticlesRefetch({
          variables: {
            userId: userId,
            limit: 5,
            cursor: "",
            classification: "recent",
          },
          fetchPolicy: "network-only",
        });
        articlesRefetch({
          variables: {
            limit: 10,
            cursor: null,
            userId: userId,
          },
          fetchPolicy: "network-only",
        });
      } else {
        articlesRefetch({
          variables: {
            limit: 10,
            cursor: null,
            userId: userId,
          },
          fetchPolicy: "network-only",
        });
      }
    }, [
      articlesRefetch,
      currentFilter,
      getFavouriteArticles,
      recentArticlesRefetch,
    ])
  );

  const [toggleFavouriteArticle] = useMutation(TOGGLE_FAVOURITE, {
    optimisticResponse: {
      toggleFavouriteArticle: {
        message: "Success",
        badge: null,
        __typename: "ToggleFavouriteResponse",
      },
    },
    update: (cache, { data }, { variables }) => {
      if (!variables) return;

      // Helper function to modify article in any array/edge
      const updateArticle = (existing: any) => {
        if (!existing) return existing;

        // For paginated queries with 'edges'
        if (existing.edges) {
          return {
            ...existing,
            edges: existing.edges.map((edge: any) => {
              if (edge.id === variables.articleId) {
                return {
                  ...edge,
                  isFavorite: !edge.isFavorite,
                };
              }
              return edge;
            }),
          };
        }

        // For regular arrays of articles
        if (Array.isArray(existing)) {
          return existing.map((article) => {
            if (article.id === variables.articleId) {
              return {
                ...article,
                isFavorite: !article.isFavorite,
              };
            }
            return article;
          });
        }

        return existing;
      };

      // Update getUserArticlesPagination query
      try {
        const userArticlesData = cache.readQuery({
          query: GET_USER_ARTICLES,
          variables: {
            userId: variables.userId,
            cursor: "",
            limit: 5,
            classification: "recent",
          },
        });

        if (userArticlesData) {
          cache.writeQuery({
            query: GET_USER_ARTICLES,
            variables: {
              userId: variables.userId,
              cursor: "",
              limit: 5,
              classification: "recent",
            },
            data: {
              getUserArticlesPagination: updateArticle(
                userArticlesData.getUserArticlesPagination
              ),
            },
          });
        }
      } catch (e) {
        console.log("Error updating articles cache:", e);
      }

      // Update getAllArticlesPagination query
      try {
        const allArticlesData = cache.readQuery({
          query: GET_ALL_ARTICLES,
          variables: {
            userId: variables.userId,
            cursor: "",
            limit: 5,
          },
        });

        if (allArticlesData) {
          cache.writeQuery({
            query: GET_ALL_ARTICLES,
            variables: {
              userId: variables.userId,
              cursor: "",
              limit: 10,
            },
            data: {
              getAllArticlesPagination: updateArticle(
                allArticlesData.getAllArticlesPagination
              ),
            },
          });
        }
      } catch (error) {
        console.log("Error updating all articles cache:", error);
      }

      console.log("CACHE", cache.data.data);
    },
  });

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

  const loadMoreFavouriteArticles = useCallback(async () => {
    if (!hasMoreFavourite || favouriteArticlesLoading || !endCursorFavourite)
      return;

    try {
      const res = await favouriteArticlesFetchMore({
        variables: {
          userId: userId,
          limit: 10,
          cursor: endCursorFavourite,
          classification: "favorite",
        },
      });
      if (res.data?.getUserArticlesPagination) {
        setFavouriteArticles((prevArticles) => [
          ...prevArticles,
          ...res.data.getUserArticlesPagination.edges,
        ]);
        setEndCursorFavourite(
          res.data.getUserArticlesPagination.pageInfo.endCursor
        );
        setHasMoreFavourite(
          res.data.getUserArticlesPagination.pageInfo.hasNextPage
        );
      }
    } catch (error) {
      console.log("Error loading more favourite articles:", error);
    }
  }, [
    endCursor,
    endCursorFavourite,
    favouriteArticlesFetchMore,
    favouriteArticlesLoading,
    hasMoreFavourite,
  ]);

  const handleEndReached = useCallback(() => {
    if (currentFilter === "Favorite") {
      loadMoreFavouriteArticles();
    } else {
      loadMoreArticles();
    }
  }, [currentFilter, loadMoreArticles, loadMoreFavouriteArticles]);

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
                onPress={() => {
                  setCurrentFilter("Favorite");
                  getFavouriteArticles({
                    variables: {
                      userId: userId,
                      limit: 5,
                      cursor: "",
                      classification: "favorite",
                    },
                  });
                }}
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

        {currentFilter !== "Favorite" && (
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
            minHeight="100%"
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
                    <Text
                      fontSize={17}
                      fontFamily="$bold"
                      color="$neutralDark90"
                    >
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
                                  refetchQueries: [
                                    {
                                      query: GET_USER_ARTICLES,
                                      variables: {
                                        userId: userId,
                                        limit: 5,
                                        cursor: "",
                                        classification: "recent",
                                      },
                                      fetchPolicy: "network-only",
                                    },
                                    {
                                      query: GET_ALL_ARTICLES,
                                      variables: {
                                        userId: userId,
                                        limit: articles.length,
                                        cursor: "",
                                      },
                                      fetchPolicy: "network-only",
                                    },
                                  ],
                                  awaitRefetchQueries: true,
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
                              refetchQueries: [
                                {
                                  query: GET_USER_ARTICLES,
                                  variables: {
                                    userId: userId,
                                    limit: 5,
                                    cursor: "",
                                    classification: "recent",
                                  },
                                  fetchPolicy: "network-only",
                                },
                                {
                                  query: GET_ALL_ARTICLES,
                                  variables: {
                                    userId: userId,
                                    limit: articles.length,
                                    cursor: "",
                                  },
                                  fetchPolicy: "network-only",
                                },
                              ],
                              awaitRefetchQueries: true,
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
                            refetchQueries: [
                              {
                                query: GET_USER_ARTICLES,
                                variables: {
                                  userId: userId,
                                  limit: 5,
                                  cursor: "",
                                  classification: "recent",
                                },
                                fetchPolicy: "network-only",
                              },
                              {
                                query: GET_ALL_ARTICLES,
                                variables: {
                                  userId: userId,
                                  limit: articles.length,
                                  cursor: "",
                                },
                                fetchPolicy: "network-only",
                              },
                            ],
                            awaitRefetchQueries: true,
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
            <View h={250} />
          </ScrollView>
        )}

        {currentFilter === "Favorite" && (
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
            minHeight="100%"
          >
            <View p="$4">
              <Box flexDirection="row" flexWrap="wrap" gap="$4">
                {favouriteArticles.length > 0 &&
                  favouriteArticles.map((obj: any) => (
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
                          refetchQueries: [
                            {
                              query: GET_USER_ARTICLES,
                              variables: {
                                userId: userId,
                                limit: 10,
                                cursor: "",
                                classification: "favorite",
                              },
                              fetchPolicy: "network-only",
                            },
                            {
                              query: GET_ALL_ARTICLES,
                              variables: {
                                userId: userId,
                                limit: articles.length,
                                cursor: "",
                              },
                              fetchPolicy: "network-only",
                            },
                          ],
                          awaitRefetchQueries: true,
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
            <View h={250} />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default InsightsScreen;
