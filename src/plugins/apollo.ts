import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";

import { StoreUserDataInterface } from "@/types/models/storeUser";
import { isLogged } from "../composables/auth";
import { setContext } from "@apollo/client/link/context";
import store from "@/store";
import { useJWTParser } from "@/composables/utils/jwtParser";

const httpLink = createHttpLink({
  uri: "https://127.0.0.1:8000/api/graphql",
  // fetchOptions: {
  //   mode: "no-cors",
  // },
});

const httpRefreshLink = "https://127.0.0.1:8000/api/refresh_token";

const authLink = setContext((_, { headers }) => {
  const { token, refresh_token } = store.state.user;

  if (isLogged()) {
    const parsedToken = useJWTParser(token!);

    if (parsedToken && parsedToken.exp && parsedToken.exp * 1000 < Date.now()) {
      fetch(httpRefreshLink, {
        method: "POST",
        // mode: "no-cors",
        body: new URLSearchParams({
          refresh_token: refresh_token!,
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
      // .catch((error) => {
      //   useAlertFactory("warning", error.toString());

      //   useAuthLogout();

      //   router.push({ name: "home" });
      //   return;
      // });
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

export const Apollo = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
