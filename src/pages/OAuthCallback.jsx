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

            const kakaoAccessToken = localStorage.getItem("kakaoAccessToken");

            if (!kakaoAccessToken) { // kakaoAccessToken이 없는, 초기 로그인
                AuthenticationService.kakaoLogin(code)
                    .then((response) => {
                        if (response.status === 'success') {
                            localStorage.setItem('accessToken', response.data.accessToken);
                            localStorage.setItem('refreshToken', response.data.refreshToken);
                            localStorage.setItem('userId', response.data.userId);
                            localStorage.setItem('userName', response.data.userName);
                            localStorage.setItem("kakaoAccessToken", response.data.kakaoAccessToken);
                            navigate('/');
                        } else {
                            console.error('카카오 로그인 실패:', response);
                            navigate('/login');
                        }
                    })
                    .catch((error) => {
                        console.error('로그인 오류:', error);
                        navigate('/');
                    });
            } else { // kakaoAccessToken이 있는, 추가 항목을 받기 위한 로그인
                AuthenticationService.kakaoLogin(code)
                    .then((response) => {
                        if (response.status === 'success') {
                            localStorage.setItem('accessToken', response.data.accessToken);
                            localStorage.setItem('refreshToken', response.data.refreshToken);
                            localStorage.setItem('userId', response.data.userId);
                            localStorage.setItem('userName', response.data.userName);
                            localStorage.setItem("kakaoAccessToken", response.data.kakaoAccessToken);
                            navigate('/');
                        } else {
                            console.error('카카오 로그인 실패:', response);
                            navigate('/login');
                        }
                    })
                    .catch((error) => {
                        console.error('로그인 오류:', error);
                        navigate('/schedule');
                    });
            }

        } else {
            console.error('카카오 인증 코드가 없습니다.');
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return <div>正在进行 Kakao 登录...</div>;
};

export default OAuthCallback;
