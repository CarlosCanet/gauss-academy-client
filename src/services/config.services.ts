import axios from "axios";
import type { UserCredentials } from "../types/user";


export const service = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
});

service.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");
  console.log(authToken);
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
})

export const loginService = (userCredentials: UserCredentials) => {
  return service.post("/auth/login", userCredentials);
}