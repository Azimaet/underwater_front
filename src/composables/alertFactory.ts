import store from "@/store";

/**
 * Alert Factory
 * @param {string} type
 * @param {string} message
 * @return {void}
 */
export function useAlertFactory(type: string, message: string): void {
  const index = store.state.alerts.length;
  store.commit("setAlert", { type: type, message: message });

  setTimeout(() => {
    store.commit("removeAlert", index);
  }, 5000);
}
