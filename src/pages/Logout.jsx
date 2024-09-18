// src/pages/Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 로그아웃 처리
        AuthenticationService.logout();
        // 로그아웃 후 로그인 페이지로 리다이렉트
        navigate('/login');
    }, [navigate]);

    return (
        <div>
            Logout...
        </div>
    );
};

export default Logout;
