import axios from "axios";
import store from "@/store";

const Axios = axios.create({
  baseURL:
    process.env.VUE_APP_BACKEND_BASE_URL +
    ":" +
    process.env.VUE_APP_BACKEND_PORT +
    "/api",
});

Axios.interceptors.request.use((request) => {
  if (store.getters.getUserToken !== null && request.headers) {
    request.headers.Authorization = "Bearer" + store.state.user.token;
  }
  return request;
});

Axios.interceptors.response.use((response) => {
  return response;
});

export default Axios;
