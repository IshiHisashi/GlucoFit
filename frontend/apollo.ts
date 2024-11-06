import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://172.20.10.2:3000/graphql",
  cache: new InMemoryCache(),
});
