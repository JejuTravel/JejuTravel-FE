import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Button from '../components/Button';
import Input from '../components/Input';
import '../assets/styles/Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        userUsername: '',
        userPassword: '',
        confirmPassword: '',
        userName: '',
        userPhoneNumber: '',
        userGender: '', 
        userDateOfBirth: '',
        userEmail: ''
    });

    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');

    const [passwordMatchMessage, setPasswordMatchMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;


        const convertedValue = name === 'userGender' ? (value === 'male') : value;


        setFormData({
            ...formData,
            [name]: convertedValue,
        });


        if (name === 'confirmPassword' || name === 'userPassword') {
            if (formData.userPassword !== formData.confirmPassword) {
                setPasswordMatchMessage('密码不匹配。');
            } else {
                setPasswordMatchMessage('密码匹配。');
            }
        }
    };


    const handleSignup = async (e) => {
        e.preventDefault();
        if (formData.userPassword !== formData.confirmPassword) {
            setError('密码不匹配');
            return;
        }

        try {
            const response = await axiosInstance.post('/api/auth/signup', formData);
            if (response.data.status === 'success') {
                setSuccess('注册成功');
                setError('');
                window.location.href = '/login'; 
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('注册失败。请检查您的输入信息。');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-header">
                <Link to="/"> 
                    <h1 className="logo">济州旅行</h1>
                </Link>
                <a href="/login" className="login-link">登录</a>
            </div>

            <h2 className="signup-title">注册</h2>
            
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            
            <form className="signup-form" onSubmit={handleSignup}>
                <Input
                    type="text"
                    placeholder="用户名"
                    name="userUsername"
                    value={formData.userUsername}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    placeholder="密码"
                    name="userPassword"
                    value={formData.userPassword}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    placeholder="确认密码"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                {/* 密码匹配提示 */}
                {passwordMatchMessage && (
                    <p className={`password-match ${formData.userPassword === formData.confirmPassword ? 'match' : 'mismatch'}`}>
                        {passwordMatchMessage}
                    </p>
                )}
                <Input
                    type="text"
                    placeholder="姓名"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="电话号码"
                    name="userPhoneNumber"
                    value={formData.userPhoneNumber}
                    onChange={handleChange}
                />
                <select
                    name="userGender"
                    value={formData.userGender ? 'male' : 'female'}
                    onChange={handleChange}
                >
                    <option value="" disabled>选择性别</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                </select>
                <Input
                    type="date"
                    placeholder="出生日期"
                    name="userDateOfBirth"
                    value={formData.userDateOfBirth}
                    onChange={handleChange}
                />
                <Input
                    type="email"
                    placeholder="电子邮箱"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                />
                <Button type="submit" className="signup-btn">注册</Button>
            </form>
        </div>
    );
};

export default Signup;
