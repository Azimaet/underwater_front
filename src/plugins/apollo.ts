import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";

import { setContext } from "@apollo/client/link/context";
import store from "@/store";

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:8000/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  const { token } = store.state.user;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache();

export const Apollo = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
