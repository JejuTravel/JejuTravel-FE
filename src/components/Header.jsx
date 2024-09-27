import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../services/AuthenticationService";

function Header() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleMouseEnter = (item) => setHoveredItem(item);
  const handleMouseLeave = () => setHoveredItem(null);

  const navItems = [
    { name: "旅游", link: "/tourism" },
    { name: "购物", link: "/shopping" },
    { name: "餐厅", link: "/restaurant" },
    { name: "住宿", link: "/accommodation" },
    { name: "公交车", link: "/bus" },
    { name: "洗手间", link: "/restroom" },
    { name: "无线网络", link: "/wifi" },
    { name: "日程表", link: "/schedule" },
    { name: "关于我们", link: "/aboutus" },
  ];

  return (
    <header className="p-4 fixed top-0 left-0 w-full z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-md">
      <div
        className="container mx-auto flex flex-col items-center"
        style={{ maxHeight: "120px", paddingLeft: "0px" }}
      >
        <div className="w-full flex justify-between items-center mb-6">
          <Link
            to="/"
            className="flex items-center"
            style={{ marginLeft: "50px" }}
          >
            <span
              className="text-4xl font-bold"
              style={{
                marginRight: "1rem",
                marginLeft: "0px",
                fontFamily: '"Noto Sans SC", sans-serif',
                color: "#FF4C4C",
              }}
            >
              济州旅游
            </span>
          </Link>
          <div className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/mypage"
                  onMouseEnter={() => handleMouseEnter("mypage")}
                  onMouseLeave={handleMouseLeave}
                  className={`btn btn-sm transition-all duration-300 ${
                    hoveredItem === "mypage"
                      ? "text-[#FF4C4C] bg-red-100 rounded-full"
                      : "text-gray-700 hover:bg-red-50 hover:rounded-full"
                  }`}
                >
                  我的页面
                </Link>
                <Link
                  to="/logout"
                  onMouseEnter={() => handleMouseEnter("logout")}
                  onMouseLeave={handleMouseLeave}
                  className={`btn btn-sm transition-all duration-300 ${
                    hoveredItem === "logout"
                      ? "text-[#FF4C4C] bg-red-100 rounded-full"
                      : "text-gray-700 hover:bg-red-50 hover:rounded-full"
                  }`}
                >
                  登出
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onMouseEnter={() => handleMouseEnter("login")}
                  onMouseLeave={handleMouseLeave}
                  className={`btn btn-sm transition-all duration-300 ${
                    hoveredItem === "login"
                      ? "text-[#FF4C4C] bg-red-100 rounded-full"
                      : "text-gray-700 hover:bg-red-50 hover:rounded-full"
                  }`}
                >
                  登录
                </Link>
                <Link
                  to="/signup"
                  onMouseEnter={() => handleMouseEnter("signup")}
                  onMouseLeave={handleMouseLeave}
                  className={`btn btn-sm transition-all duration-300 ${
                    hoveredItem === "signup"
                      ? "text-[#FF4C4C] bg-red-100 rounded-full"
                      : "text-gray-700 hover:bg-red-50 hover:rounded-full"
                  }`}
                >
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
        <nav className="w-full">
          <ul className="flex flex-wrap justify-center space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                  className={`btn btn-sm transition-all duration-300 px-4 ${
                    hoveredItem === item.name
                      ? "text-[#FF4C4C] bg-red-100 rounded-full"
                      : "text-gray-700 hover:bg-red-50 hover:rounded-full"
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
