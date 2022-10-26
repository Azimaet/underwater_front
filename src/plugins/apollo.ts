import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";

import { StoreUserDataInterface } from "@/composables/types/storeUser";
import router from "@/router";
import { setContext } from "@apollo/client/link/context";
import store from "@/store";
import { useAuthLogout } from "@/composables/auth";
import { useJWTParser } from "@/composables/utils/jwtParser";

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:8000/api/graphql",
});

const httpRefreshLink = "http://127.0.0.1:8000/api/refresh_token";

const authLink = setContext((_, { headers }) => {
  const { token, refresh_token } = store.state.user;

  const parsedToken = token ? useJWTParser(token) : null;

  if (!token || !refresh_token || !parsedToken) {
    store.commit("setAlert", {
      type: "error",
      message: "You need to login again to request server.",
    });

    useAuthLogout();

    router.push({ name: "home" });
  }

  if (refresh_token && parsedToken && parsedToken.exp! * 1000 < Date.now()) {
    fetch(httpRefreshLink, {
      method: "POST",
      body: new URLSearchParams({
        refresh_token: refresh_token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const parsedToken: StoreUserDataInterface = useJWTParser(data.token);

        store.commit("setUserToken", data.token);
        store.commit("setRefreshUserToken", data.refresh_token);
        store.commit("setUserEmail", parsedToken.email);
        store.commit("setUserRoles", parsedToken.roles);
        store.commit("setUserName", parsedToken.username);
        store.commit("setUserId", parsedToken.id);
      });
  }

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
