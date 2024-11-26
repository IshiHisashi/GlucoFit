// https://www.apollographql.com/docs/react/pagination/core-api

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://172.20.10.4:3000/graphql",
  cache: new InMemoryCache(),
});
