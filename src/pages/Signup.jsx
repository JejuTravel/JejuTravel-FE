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
        userGender: '', // initially empty to handle selection
        userDateOfBirth: '',
        userEmail: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [passwordMatchMessage, setPasswordMatchMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle gender conversion to boolean
        const convertedValue = name === 'userGender' ? (value === 'male') : value;

        setFormData({
            ...formData,
            [name]: convertedValue,
        });

        // Check password match
        if (name === 'confirmPassword' || name === 'userPassword') {
            if (formData.userPassword !== formData.confirmPassword) {
                setPasswordMatchMessage('비밀번호가 일치하지 않습니다.');
            } else {
                setPasswordMatchMessage('비밀번호가 일치합니다.');
            }
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (formData.userPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axiosInstance.post('/api/auth/signup', formData);
            if (response.data.status === 'success') {
                setSuccess('회원가입 성공');
                setError('');
                window.location.href = '/login';
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('회원가입 실패. 입력 정보를 확인하세요.');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-header">
                <Link to="/"> {/* Link to navigate to home */}
                    <h1 className="logo">JEJU TRAVEL</h1>
                </Link>
                <a href="/login" className="login-link">로그인</a>
            </div>

            <h2 className="signup-title">회원가입</h2>
            
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            
            <form className="signup-form" onSubmit={handleSignup}>
                <Input
                    type="text"
                    placeholder="ID"
                    name="userUsername"
                    value={formData.userUsername}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    placeholder="PASSWORD"
                    name="userPassword"
                    value={formData.userPassword}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    placeholder="VERIFY PASSWORD"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                {passwordMatchMessage && (
                    <p className={`password-match ${formData.userPassword === formData.confirmPassword ? 'match' : 'mismatch'}`}>
                        {passwordMatchMessage}
                    </p>
                )}
                <Input
                    type="text"
                    placeholder="NAME"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="PHONE NUMBER"
                    name="userPhoneNumber"
                    value={formData.userPhoneNumber}
                    onChange={handleChange}
                />
                <select
                    name="userGender"
                    value={formData.userGender ? 'male' : 'female'}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <Input
                    type="date"
                    placeholder="BIRTH DATE"
                    name="userDateOfBirth"
                    value={formData.userDateOfBirth}
                    onChange={handleChange}
                />
                <Input
                    type="email"
                    placeholder="EMAIL"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                />
                <Button type="submit" className="signup-btn">SIGNUP</Button>
            </form>
        </div>
    );
};

export default Signup;
