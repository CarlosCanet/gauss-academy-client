import axios from "axios";

export const service = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
});

service.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
})