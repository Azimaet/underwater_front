import axios from "axios";
import router from "@/router";
import store from "@/store";
import { useAuthLogout } from "@/composables/auth";

const Axios = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

Axios.interceptors.request.use((request) => {
  if (store.getters.getUserToken !== null && request.headers) {
    request.headers.Authorization = "Bearer" + store.state.user.token;
  }

  return request;
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      useAuthLogout();
      router.push("/login");
    }
  }
);

export default Axios;
