import axios from "axios";
import store from "@/store";

const Axios = axios.create({
  baseURL: "https://127.0.0.1:8000/api",
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
