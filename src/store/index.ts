import { StoreUserInterface } from "../types/components/storeUser";
import { createStore } from "vuex";

const user: StoreUserInterface = {
  data: {
    email: null,
    roles: [],
    name: null,
  },
  token: null,
  refresh_token: null,
};

/**
 * Store builder
 */
export default createStore({
  state: {
    user: user,
  },
  getters: {
    getUserToken(state) {
      return state.user.token;
    },
  },
  mutations: {
    initStore(state) {
      if (localStorage.getItem("store") !== null) {
        this.replaceState(
          Object.assign(
            state,
            JSON.parse(localStorage.getItem("store") || "{}")
          )
        );
      }
    },
    setUserEmail(state, data) {
      state.user.data.email = data;
    },
    setUserRoles(state, data) {
      state.user.data.roles = data;
    },
    setUserName(state, data) {
      state.user.data.name = data;
    },
    setUserToken(state, token) {
      state.user.token = token;
    },
    setRefreshUserToken(state, token) {
      state.user.refresh_token = token;
    },
  },
  actions: {},
  modules: {},
});
