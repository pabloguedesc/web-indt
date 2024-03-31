import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
