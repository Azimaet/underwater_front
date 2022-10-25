import { StoreUserInterface } from "@/composables/types/storeUser";
import { createStore } from "vuex";

const user: StoreUserInterface = {
  data: {
    id: null,
    email: null,
    roles: [],
    username: null,
    avatar: null,
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
        console.log(localStorage.getItem("store"));
        this.replaceState(
          Object.assign(
            state,
            JSON.parse(localStorage.getItem("store") || "{}")
          )
        );
      }
    },
    setUserId(state, data) {
      state.user.data.id = data;
    },
    setUserEmail(state, data) {
      state.user.data.email = data;
    },
    setUserRoles(state, data) {
      state.user.data.roles = data;
    },
    setUserName(state, data) {
      state.user.data.username = data;
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
