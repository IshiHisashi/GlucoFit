// https://www.apollographql.com/docs/react/pagination/core-api

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://10.128.233.213:3000/graphql",
  cache: new InMemoryCache(),
});
