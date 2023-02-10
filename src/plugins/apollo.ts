import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";

import { StoreUserDataInterface } from "@/types/models/storeUser";
import { createApolloProvider } from "@vue/apollo-option";
import { isLogged } from "@/composables/auth";
import { setContext } from "@apollo/client/link/context";
import store from "@/store";
import { useJWTParser } from "@/composables/utils/jwtParser";

const httpLink = createHttpLink({
  uri:
    process.env.VUE_APP_BACKEND_BASE_URL +
    ":" +
    process.env.VUE_APP_BACKEND_PORT +
    "/api/graphql",
});

const httpRefreshLink =
  process.env.VUE_APP_BACKEND_BASE_URL +
  ":" +
  process.env.VUE_APP_BACKEND_PORT +
  "/api/refresh_token";

const authLink = setContext((_, { headers }) => {
  const { token, refresh_token } = store.state.user;

  if (isLogged()) {
    const parsedToken = token ? useJWTParser(token) : null;

    if (
      refresh_token &&
      parsedToken &&
      parsedToken.exp &&
      parsedToken.exp * 1000 < Date.now()
    ) {
      fetch(httpRefreshLink, {
        method: "POST",
        body: new URLSearchParams({
          refresh_token: refresh_token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const newParsedToken: StoreUserDataInterface =
            useJWTParser(data.token) ?? null;

          if (newParsedToken) {
            store.commit("setUserToken", data.token);
            store.commit("setRefreshUserToken", data.refresh_token);
            store.commit("setUserEmail", newParsedToken.email);
            store.commit("setUserRoles", newParsedToken.roles);
            store.commit("setUserName", newParsedToken.username);
            store.commit("setUserId", newParsedToken.id);
          }
        });
    }
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

export const Apollo = createApolloProvider({
  defaultClient: apolloClient,
});
