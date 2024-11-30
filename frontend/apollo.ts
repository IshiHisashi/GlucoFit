// https://www.apollographql.com/docs/react/pagination/core-api

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
  // uri: "https://backend.glucofit.ca/graphql",
  uri: "http://10.128.208.235:3000/graphql",
  cache: new InMemoryCache(),
});
