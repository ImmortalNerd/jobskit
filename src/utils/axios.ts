import { CONFIG } from "@/config-global";
import axios from "axios";

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || error)
);

export default axiosInstance;

export const endpoints = {
  auth: {
    me: "/api/user/whoami",
    signIn: "/api/user/login",
  },
  jobs: {
    all: "/api/job/all",
    detailed: "/api/job/all/detailed",
  },
};
