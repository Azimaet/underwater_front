import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";

import { apiAxios } from "@/plugins/axios";
import { createApolloProvider } from "@vue/apollo-option";
import { onError } from "@apollo/client/link/error";
import store from "@/store";

const httpLink = createHttpLink({
  uri:
    process.env.VUE_APP_BACKEND_BASE_URL +
    ":" +
    process.env.VUE_APP_BACKEND_PORT +
    "/api/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    const statusCode = networkError.message.match(/\b\d{3}\b/);

    if (statusCode && statusCode[0] === "401") {
      apiAxios.post("/refresh_token").then((response) => {
        store.commit("setRefreshUserToken", response.data.refresh_token);
      });
    }
  }
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  link: errorLink.concat(httpLink),
});

export const Apollo = createApolloProvider({
  defaultClient: apolloClient,
});
