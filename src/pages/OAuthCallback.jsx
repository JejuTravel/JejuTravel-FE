import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';

const OAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const code = searchParams.get('code');

        if (code) {
            console.log("카카오 인증 코드:", code); // 인증 코드 로그 출력

            AuthenticationService.kakaoLogin(code)
                .then((response) => {
                    if (response.status === 'success') {
                        localStorage.setItem('accessToken', response.data.accessToken);
                        localStorage.setItem('refreshToken', response.data.refreshToken);
                        navigate('/');
                    } else {
                        console.error('카카오 로그인 실패:', response);
                        navigate('/login');
                    }
                })
                .catch((error) => {
                    console.error('로그인 오류:', error);
                    navigate('/login');
                });
        } else {
            console.error('카카오 인증 코드가 없습니다.');
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return <div>正在进行 Kakao 登录...</div>;
};

export default OAuthCallback;
