import store from "@/store";

/**
 * Alert Factory
 * @param {string} type
 * @param {string} message
 * @return {void}
 */
export function useAlertFactory(type: string, message: string): void {
  store.commit("setAlert", { type: type, message: message });
}
