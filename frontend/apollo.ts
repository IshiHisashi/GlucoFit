import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://10.128.222.203:3000/graphql",
  cache: new InMemoryCache(),
});
