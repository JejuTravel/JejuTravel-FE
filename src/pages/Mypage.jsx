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


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await AuthenticationService.getUserProfile(); 
                setProfile(response);
            } catch (error) {
                setError('用户信息加载失败'); 
            }
        };
        fetchUserProfile();
    }, []);


    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthenticationService.updateUserProfile(profile); 
            if (response.status === 'success') {
                setSuccess('用户信息更新成功');
                setError('');
            } else {
                setError(response.message || '更新用户信息失败'); 
            }
        } catch (error) {
            setError('更新用户信息失败，请检查输入数据'); 
        }
    };

    // 更新密码
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthenticationService.updatePassword({ currentPassword, newPassword }); 
            if (response.status === 'success') {
                setSuccess('密码更新成功'); 
                setError('');
            } else {
                setError(response.message || '密码更新失败'); 
            }
        } catch (error) {
            setError('密码更新失败，请检查输入数据'); 
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
            <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#FF6F6F', fontSize: '2.5rem', fontWeight: 'bold' }}>我的页面</h1>
            {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}
            {success && <p style={{ color: 'green', textAlign: 'center', marginBottom: '20px' }}>{success}</p>}

            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold' }}>用户信息</h3>
                <form onSubmit={handleUpdateProfile}>
                    <div style={{ marginBottom: '15px' }}>
                        <Input
                            type="text"
                            name="userName"
                            value={profile.userName}
                            placeholder="姓名"
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <Input
                            type="text"
                            name="userPhoneNumber"
                            value={profile.userPhoneNumber}
                            placeholder="电话号码"
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
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <Input
                            type="date"
                            name="userDateOfBirth"
                            value={profile.userDateOfBirth}
                            placeholder="出生日期"
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <Input
                            type="email"
                            name="userEmail"
                            value={profile.userEmail}
                            placeholder="电子邮箱"
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                        />
                    </div>
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
                        更新信息
                    </button>
                </form>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold' }}>更改密码</h3>
                <form onSubmit={handleUpdatePassword}>
                    <div style={{ marginBottom: '15px' }}>
                        <Input
                            type="password"
                            name="currentPassword"
                            value={currentPassword}
                            placeholder="当前密码"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <Input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            placeholder="新密码"
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                        />
                    </div>
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
                        更新密码
                    </button>
                </form>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button 
                    onClick={() => navigate('/')} 
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
                    返回首页
                </button>
            </div>
        </div>
    );
};

export default Mypage;
