import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://192.168.1.95:3000/graphql",
  cache: new InMemoryCache(),
});
