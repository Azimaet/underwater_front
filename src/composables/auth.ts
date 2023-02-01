import { FormUserCredentials } from "@/types/models/form";
import { StoreUserDataInterface } from "@/types/models/storeUser";
import { apiAxios } from "@/plugins/axios";
import router from "@/router";
import store from "@/store";
import { useAlertFactory } from "./alertFactory";
import { useJWTParser } from "./utils/jwtParser";

/**
 * Global Authentication Login function.
 * @param {FormLoginCredentials} credentials
 * @return {Promise<void>}
 */
export async function useAuthLogin(
  credentials: FormUserCredentials
): Promise<void> {
  try {
    const response = await apiAxios.post("/login", credentials);

    if (response.data.token) {
      const parsedToken: StoreUserDataInterface = useJWTParser(
        response.data.token
      );

      store.commit("setUserToken", response.data.token);
      store.commit("setRefreshUserToken", response.data.refresh_token);
      store.commit("setUserEmail", parsedToken.email);
      store.commit("setUserRoles", parsedToken.roles);
      store.commit("setUserAvatar", parsedToken.avatar);
      store.commit("setUserName", parsedToken.username);
      store.commit("setUserId", parsedToken.id);

      useAlertFactory(
        "success",
        "You are logged, welcome back " + parsedToken.username + "!"
      );

      router.push({ name: "home" });
    }
  } catch (error: any) {
    const message =
      error.response.status == 401
        ? "Error 401: Invalid credentials. Try to login again."
        : "Error " +
          error.response.status +
          ": Undefined error. Please contact admin";

    const type = error.response.status == 401 ? "warning" : "error";

    useAlertFactory(type, message);

    router.push({ name: "home" });
  }
}

/**
 * Global Authentication Logout function
 * @return {<void>}
 */
export function useAuthLogout(): void {
  store.commit("setUserToken", null);
  store.commit("setRefreshUserToken", null);
  store.commit("setUserEmail", null);
  store.commit("setUserRoles", []);
  store.commit("setUserAvatar", null);
  store.commit("setUserName", null);
  store.commit("setUserId", null);
}

/**
 * Simple util bool isLogged to manage display
 * @return {boolean}
 */
export function isLogged(): boolean {
  return !!(store.state.user.token && store.state.user.refresh_token);
}
