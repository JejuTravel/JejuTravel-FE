// src/pages/OAuthCallback.jsx
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';

const OAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const code = searchParams.get('code');

        if (code) {
            // 인가 코드를 백엔드로 전달
            AuthenticationService.kakaoLogin(code)
                .then((response) => {
                    if (response.status === 'success') {
                        // 성공 시 홈으로 이동
                        sessionStorage.setItem('accessToken', response.data.accessToken);
                        sessionStorage.setItem('refreshToken', response.data.refreshToken);
                        navigate('/');
                    } else {
                        navigate('/login');
                    }
                })
                .catch((error) => {
                    console.error('카카오 로그인 실패:', error);
                    navigate('/login');
                });
        }
    }, [searchParams, navigate]);

    return <div>카카오 로그인 중입니다...</div>;
};

export default OAuthCallback;
