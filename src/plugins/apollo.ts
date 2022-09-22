import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:8000/api/graphql",
});

const cache = new InMemoryCache();

export const Apollo = new ApolloClient({
  link: httpLink,
  cache,
});
