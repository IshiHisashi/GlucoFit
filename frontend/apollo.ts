// https://www.apollographql.com/docs/react/pagination/core-api

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
  // uri: "http://192.168.1.65:3000/graphql",
  uri: "http://ec2-34-224-127-225.compute-1.amazonaws.com:3000/graphql",
  cache: new InMemoryCache(),
});
