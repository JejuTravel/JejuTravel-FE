// src/pages/Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 로그아웃 처리
        AuthenticationService.logout();
        navigate('/');
    }, [navigate]);

    return (
        <div>
            注销中...
        </div>
    );
};

export default Logout;
