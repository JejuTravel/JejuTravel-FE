import React, { useState } from "react";

function Header() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <header className="p-4 fixed top-0 left-0 w-full z-10 bg-transparent">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="text-3xl sm:text-4xl font-bold text-white">
          JEJU TRAVEL
        </div>
        <div className="mt-2 sm:mt-0 flex space-x-4">
          <a
            href="#"
            onMouseEnter={() => handleMouseEnter("login")}
            onMouseLeave={handleMouseLeave}
            className={`transition-colors duration-300 ${
              hoveredItem === "login" ? "text-[#FF4C4C]" : "text-white"
            }`}
          >
            로그인
          </a>
          <span className="hidden sm:inline text-white">/</span>
          <a
            href="#"
            onMouseEnter={() => handleMouseEnter("signup")}
            onMouseLeave={handleMouseLeave}
            className={`transition-colors duration-300 ${
              hoveredItem === "signup" ? "text-[#FF4C4C]" : "text-white"
            }`}
          >
            회원가입
          </a>
        </div>
      </div>
      <nav>
        <ul className="flex flex-wrap justify-center space-x-8 text-lg md:text-xl font-semibold">
          {[
            "관광",
            "쇼핑",
            "음식점",
            "숙박",
            "버스",
            "공중화장실",
            "공공와이파이",
          ].map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
              className={`cursor-pointer transition-colors duration-300 ${
                hoveredItem === item ? "text-[#FF4C4C]" : "text-white"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
