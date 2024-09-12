// src/utils/axiosInstance.js
import axios from 'axios';
import AuthenticationService from '../services/AuthenticationService';

const axiosInstance = axios.create({
  baseURL: '/api', // API의 기본 URL 설정
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
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
                originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                return axiosInstance(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
