/** @format */

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:9001",
  withCredentials: true,
});

// 요청 인터셉터: 토큰을 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token", token);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found for request:", `${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 오류 처리
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("401 Unauthorized error detected:", error.response?.data);

      // 특정 경우에만 자동 리다이렉트 (예: 토큰 만료)
      const errorCode = error.response?.data?.errorCode;
      const isTokenExpired = errorCode === "TOKEN_EXPIRED" || errorCode === "INVALID_TOKEN";

      if (isTokenExpired) {
        // 토큰 제거
        localStorage.removeItem("token");

        // 현재 페이지 경로를 저장하고 로그인 페이지로 리다이렉트
        const currentPath = window.location.pathname;
        const loginUrl = `/login?redirectTo=${encodeURIComponent(currentPath)}`;

        // 브라우저 환경에서만 리다이렉트 실행
        if (typeof window !== "undefined") {
          console.log("Redirecting to login due to token expiration");
          window.location.href = loginUrl;
        }
      }
      // 다른 401 오류는 컴포넌트에서 처리하도록 그대로 전달
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
