import { AlertInterface } from "@/types/models/alerts";
import { StoreUserInterface } from "@/types/models/storeUser";
import { createStore } from "vuex";

const user: StoreUserInterface = {
  data: {
    iat: null,
    exp: null,
    id: null,
    email: null,
    roles: [],
    username: null,
    avatar: null,
  },
  token: null,
  refresh_token: null,
};

const alerts: AlertInterface[] = [];

/**
 * Store builder
 */
export default createStore({
  state: {
    user: user,
    alerts: alerts,
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
    setUserId(state, data) {
      state.user.data.id = data;
      localStorage.setItem("store", JSON.stringify(state));
    },
    setUserEmail(state, data) {
      state.user.data.email = data;
      localStorage.setItem("store", JSON.stringify(state));
    },
    setUserRoles(state, data) {
      state.user.data.roles = data;
      localStorage.setItem("store", JSON.stringify(state));
    },
    setUserName(state, data) {
      state.user.data.username = data;
      localStorage.setItem("store", JSON.stringify(state));
    },
    setUserAvatar(state, data) {
      state.user.data.avatar = data;
      localStorage.setItem("store", JSON.stringify(state));
    },
    setUserToken(state, token) {
      state.user.token = token;
      localStorage.setItem("store", JSON.stringify(state));
    },
    setRefreshUserToken(state, token) {
      state.user.refresh_token = token;
      localStorage.setItem("store", JSON.stringify(state));
    },
    setAlert(state, { type, message }) {
      state.alerts.push({
        type: type,
        message: message,
      });
    },
    removeAlert(state, index) {
      state.alerts.splice(index, 1);
    },
  },
  actions: {},
  modules: {},
});
