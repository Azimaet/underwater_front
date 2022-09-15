import { authenticatorService } from "@/composables/authenticator";
import axios from "axios";
import router from "@/router";

const Axios = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

Axios.interceptors.request.use((request) => {
  console.log(request);

  if (authenticatorService.isLogged() && request.headers) {
    request.headers.Authorization = "Bearer" + authenticatorService.getToken();
  }

  return request;
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      authenticatorService.logout();
      router.push("/login");
    }
  }
);

export default Axios;
