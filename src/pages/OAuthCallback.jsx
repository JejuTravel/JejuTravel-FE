import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';

const OAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const code = searchParams.get('code'); // URL에서 인가 코드를 가져옴

        if (code) {
            // 인가 코드를 이용해 카카오 로그인 요청
            AuthenticationService.kakaoLogin(code)
                .then((response) => {
                    if (response.status === 'success') {
                        // 로그인 성공 시 액세스 토큰과 리프레시 토큰을 세션에 저장
                        sessionStorage.setItem('accessToken', response.data.accessToken); 
                        sessionStorage.setItem('refreshToken', response.data.refreshToken); 
                        navigate('/'); // 홈 페이지로 리다이렉트
                    } else {
                        navigate('/login'); // 실패 시 로그인 페이지로 리다이렉트
                    }
                })
                .catch((error) => {
                    console.error('Kakao 登录失败:', error); // 로그인 실패 시 오류 로그 출력
                    navigate('/login'); // 오류 발생 시 로그인 페이지로 리다이렉트
                });
        }
    }, [searchParams, navigate]);

    return <div>正在进行 Kakao 登录...</div>; // 로그인 진행 중 메시지 표시
};

export default OAuthCallback;
