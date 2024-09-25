import axios from "axios";
import AuthenticationService from "../services/AuthenticationService";

// 기본 URL 설정
const BASE_URL = "http://localhost:8080";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json", // 기본 헤더 설정
  },
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    // localStorage에서 토큰 가져오기
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Authorization 헤더 추가
    }

    // 경로가 특정 API 호출이 아닌 경우에만 "/api/v1"을 앞에 추가
    if (
      !config.url.startsWith("/api/auth") && // 로그인 관련 경로
      !config.url.startsWith("/api/mypage")  // 마이페이지 관련 경로
    ) {
      config.url = `/api/v1${config.url}`; // "/api/v1"을 경로에 추가
    }

    return config; // 설정된 config 반환
  },
  (error) => {
    return Promise.reject(error); // 에러 발생 시
  }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response, // 응답이 정상일 경우 바로 반환
  async (error) => {
    const originalRequest = error.config;

    // 만약 401 에러가 발생하고, 재시도가 아니라면
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그 설정
      const refreshed = await AuthenticationService.refreshToken(); // 토큰 갱신 시도
      if (refreshed) {
        // 새로운 토큰을 요청 헤더에 추가하여 다시 요청
        originalRequest.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
        return axiosInstance(originalRequest); // 재시도
      }
    }
    return Promise.reject(error); // 재시도 실패 시 에러 반환
  }
);

export default axiosInstance;
