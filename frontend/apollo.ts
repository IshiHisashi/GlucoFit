// https://www.apollographql.com/docs/react/pagination/core-api

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
  // uri: "https://backend.glucofit.ca/graphql",
  uri: "http://192.168.1.65:3000/graphql",
  cache: new InMemoryCache(),
});
