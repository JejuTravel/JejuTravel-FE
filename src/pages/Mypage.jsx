import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';
import Input from '../components/Input';

const Mypage = () => {
    const [profile, setProfile] = useState({
        userName: '',
        userPhoneNumber: '',
        userGender: '',
        userDateOfBirth: '',
        userEmail: '',
    });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    // 개인정보 조회
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await AuthenticationService.getUserProfile();
                setProfile(response);
            } catch (error) {
                setError('Failed to load user profile.');
            }
        };
        fetchUserProfile();
    }, []);

    // 개인정보 수정
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthenticationService.updateUserProfile(profile);
            if (response.status === 'success') {
                setSuccess('Profile updated successfully.');
                setError('');
            } else {
                setError(response.message || 'Failed to update profile.');
            }
        } catch (error) {
            setError('Failed to update profile. Please check the input data.');
        }
    };

    // 비밀번호 변경
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthenticationService.updatePassword({ currentPassword, newPassword });
            if (response.status === 'success') {
                setSuccess('Password updated successfully.');
                setError('');
            } else {
                setError(response.message || 'Failed to update password.');
            }
        } catch (error) {
            setError('Failed to update password. Please check the input data.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#FFF5F5', borderRadius: '8px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#FF6F6F', fontSize: '2.5rem', fontWeight: 'bold' }}>My Page</h1>
            {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}
            {success && <p style={{ color: 'green', textAlign: 'center', marginBottom: '20px' }}>{success}</p>}

            {/* Profile Section */}
            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold' }}>Profile Information</h3>
                <form onSubmit={handleUpdateProfile}>
                    <div style={{ marginBottom: '15px' }}>
                        <Input
                            type="text"
                            name="userName"
                            value={profile.userName}
                            placeholder="Name"
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <Input
                            type="text"
                            name="userPhoneNumber"
                            value={profile.userPhoneNumber}
                            placeholder="Phone Number"
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <select
                            name="userGender"
                            value={profile.userGender ? 'male' : 'female'}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <Input
                            type="date"
                            name="userDateOfBirth"
                            value={profile.userDateOfBirth}
                            placeholder="Birth Date"
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <Input
                            type="email"
                            name="userEmail"
                            value={profile.userEmail}
                            placeholder="Email"
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                        />
                    </div>
                    {/* Update Profile Button */}
                    <button 
                        type="submit"
                        style={{ 
                            width: '100%', 
                            padding: '12px', 
                            borderRadius: '5px', 
                            backgroundColor: '#FF8C8C', 
                            color: 'white', 
                            border: 'none',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#FFA7A7'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#FF8C8C'}
                    >
                        Update Profile
                    </button>
                </form>
            </div>

            {/* Password Section */}
            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold' }}>Change Password</h3>
                <form onSubmit={handleUpdatePassword}>
                    <div style={{ marginBottom: '15px' }}>
                        <Input
                            type="password"
                            name="currentPassword"
                            value={currentPassword}
                            placeholder="Current Password"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <Input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            placeholder="New Password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                        />
                    </div>
                    {/* Update Password Button */}
                    <button 
                        type="submit"
                        style={{ 
                            width: '100%', 
                            padding: '12px', 
                            borderRadius: '5px', 
                            backgroundColor: '#FF8C8C', 
                            color: 'white', 
                            border: 'none',
                            fontWeight: 'bold', 
                            cursor: 'pointer', 
                            transition: 'background-color 0.3s', 
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#FFA7A7'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#FF8C8C'}
                    >
                        Update Password
                    </button>
                </form>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button 
                    onClick={() => navigate('/')} // 클릭 시 홈화면으로 이동
                    style={{ 
                        backgroundColor: '#FFB997', 
                        color: 'white', 
                        padding: '10px 20px', 
                        borderRadius: '5px', 
                        border: 'none',
                        fontWeight: 'bold', 
                        cursor: 'pointer', 
                        transition: 'background-color 0.3s',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#FFA07A'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#FFB997'}
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default Mypage;
