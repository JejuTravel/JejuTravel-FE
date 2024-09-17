import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';

function Header() {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 로그인 상태 확인
        const accessToken = localStorage.getItem('accessToken');
        setIsLoggedIn(!!accessToken); // 토큰이 존재하면 로그인 상태
    }, []);

    const handleMouseEnter = (item) => setHoveredItem(item);
    const handleMouseLeave = () => setHoveredItem(null);

    const navItems = [
        { name: 'Tourism', link: '/tourism' },
        { name: 'Shopping', link: '/shopping' },
        { name: 'Restaurant', link: '/restaurant' },
        { name: 'Accommodation', link: '/accommodation' },
        { name: 'Bus', link: '/bus' },
        { name: 'Restroom', link: '/restroom' },
        { name: 'Wifi', link: '/wifi' },
        { name: 'Schedule', link: '/schedule' },
        { name: 'About Us', link: '/aboutus' },
    ];

    return (
        <header className="p-4 fixed top-0 left-0 w-full z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-md">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <Link
                        to="/"
                        className="text-4xl font-bold text-[#FF4C4C] hover:text-[#FF6B6B] transition-colors duration-300"
                    >
                        JEJU TRAVEL
                    </Link>
                    <div className="flex space-x-4">
                        {isLoggedIn ? (
                            // 로그인 상태일 때 마이페이지와 로그아웃 링크
                            <>
                                <Link
                                    to="/mypage"
                                    onMouseEnter={() => handleMouseEnter('mypage')}
                                    onMouseLeave={handleMouseLeave}
                                    className={`btn btn-sm transition-all duration-300 ${
                                        hoveredItem === 'mypage'
                                            ? 'text-[#FF4C4C] bg-red-100 rounded-full'
                                            : 'text-gray-700 hover:bg-red-50 hover:rounded-full'
                                    }`}
                                >
                                    My Page
                                </Link>
                                <Link
                                    to="/logout"
                                    onMouseEnter={() => handleMouseEnter('logout')}
                                    onMouseLeave={handleMouseLeave}
                                    className={`btn btn-sm transition-all duration-300 ${
                                        hoveredItem === 'logout'
                                            ? 'text-[#FF4C4C] bg-red-100 rounded-full'
                                            : 'text-gray-700 hover:bg-red-50 hover:rounded-full'
                                    }`}
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            // 로그아웃 상태일 때 로그인과 회원가입 링크
                            <>
                                <Link
                                    to="/login"
                                    onMouseEnter={() => handleMouseEnter('login')}
                                    onMouseLeave={handleMouseLeave}
                                    className={`btn btn-sm transition-all duration-300 ${
                                        hoveredItem === 'login'
                                            ? 'text-[#FF4C4C] bg-red-100 rounded-full'
                                            : 'text-gray-700 hover:bg-red-50 hover:rounded-full'
                                    }`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    onMouseEnter={() => handleMouseEnter('signup')}
                                    onMouseLeave={handleMouseLeave}
                                    className={`btn btn-sm transition-all duration-300 ${
                                        hoveredItem === 'signup'
                                            ? 'text-[#FF4C4C] bg-red-100 rounded-full'
                                            : 'text-gray-700 hover:bg-red-50 hover:rounded-full'
                                    }`}
                                >
                                    SignUp
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <nav>
                    <ul className="flex flex-wrap justify-center space-x-6">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.link}
                                    onMouseEnter={() => handleMouseEnter(item.name)}
                                    onMouseLeave={handleMouseLeave}
                                    className={`btn btn-sm transition-all duration-300 px-4 ${
                                        hoveredItem === item.name
                                            ? 'text-[#FF4C4C] bg-red-100 rounded-full'
                                            : 'text-gray-700 hover:bg-red-50 hover:rounded-full'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
