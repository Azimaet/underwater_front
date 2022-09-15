import Axios from "@/api/config";
import { FormLoginCredentials } from "@/types/components/form";

const login = (credentials: FormLoginCredentials) => {
  return Axios.post("/api/login", credentials);
};

const logout = () => {
  localStorage.removeItem("token");
};

const getToken = () => {
  return !!localStorage.getItem("token");
};

const saveTokens = (token: string, refresh_token: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refresh_token", refresh_token);
};

const isLogged = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const authenticatorService = {
  login,
  logout,
  getToken,
  saveTokens,
  isLogged,
};
