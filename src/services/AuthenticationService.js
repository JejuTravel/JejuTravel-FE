// src/services/AuthenticationService.js
import axiosInstance from '../utils/axiosInstance';

const AuthenticationService = {
    async signIn(userUsername, userPassword) {
        try {
            // 전달받은 userUsername과 userPassword를 사용
            const response = await axiosInstance.post('/api/auth/signin', { userUsername, userPassword });
            if (response.data.status === 'success') {
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);
                return response.data;
            } else {
                throw new Error(response.data.message || '로그인 실패');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            throw error;
        }
    },

    async refreshToken() {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axiosInstance.post('/auth/refresh', { refreshToken });
            if (response.data.status === 'success') {
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);
                return true;
            } else {
                console.error('토큰 재발급 실패:', response.data.message);
                return false;
            }
        } catch (error) {
            console.error('토큰 재발급 중 오류 발생:', error);
            return false;
        }
    },
};

export default AuthenticationService;
