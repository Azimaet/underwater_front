import Axios from "@/plugins/axios";
import { FormUserCredentials } from "@/composables/types/form";
import { StoreUserDataInterface } from "./types/storeUser";
import router from "@/router";
import store from "@/store";
import { useJWTParser } from "./utils/jwtParser";

/**
 * Global Authentication Login function
 * @param {FormLoginCredentials} credentials FormLoginCredentials
 * @return {Promise<void>} Promise<void>
 */
export async function useAuthLogin(
  credentials: FormUserCredentials
): Promise<void> {
  try {
    const response = await Axios.post("/login", credentials);

    if (response.data.token) {
      const parsedToken: StoreUserDataInterface = useJWTParser(
        response.data.token
      );

      store.commit("setUserToken", response.data.token);
      store.commit("setRefreshUserToken", response.data.refresh_token);
      store.commit("setUserEmail", parsedToken.email);
      store.commit("setUserRoles", parsedToken.roles);
      store.commit("setUserName", parsedToken.username);
      store.commit("setUserId", parsedToken.id);

      router.replace({ query: undefined });
    }
  } catch (err) {
    return console.log(err);
  }
}

/**
 * Global Authentication Logout function
 * @return {<void>} <void>
 */
export function useAuthLogout(): void {
  store.commit("setUserToken", null);
  store.commit("setRefreshUserToken", null);
  store.commit("setUserEmail", null);
  store.commit("setUserRoles", []);
  store.commit("setUserId", null);

  router.push({ name: "home", query: { redirection_context: "logout" } });
}

/**
 * Simple util bool isLogged to manage display
 * @return {boolean} boolean
 */
export function isLogged(): boolean {
  return !!store.state.user.token;
}
