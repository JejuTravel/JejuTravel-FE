import axios from "axios";
import AuthenticationService from "../services/AuthenticationService";

const BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // URL에 따라 동적으로 경로 설정
    if (
      !config.url.startsWith("/api/auth") &&
      !config.url.startsWith("/api/mypage")
    ) {
      config.url = `/api/v1${config.url}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshed = await AuthenticationService.refreshToken();
      if (refreshed) {
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("accessToken")}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
