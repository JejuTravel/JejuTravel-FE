import React, { useState } from "react";
import { Link } from "react-router-dom";
import LandmarkSection from './components/landmarkSection';
import TourismSection from './components/tourismSection';
import SearchBar from './components/SearchBar';

function Tourism() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div>
      <header className="p-4 fixed top-0 left-0 w-full z-10 bg-transparent flex justify-between items-center">
        <div className="text-3xl font-bold text-[#FF4C4C]">
          <Link to="/">JEJU TRAVEL</Link>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <Link
              to="/login"
              onMouseEnter={() => handleMouseEnter("login")}
              onMouseLeave={handleMouseLeave}
              className={`transition-colors duration-300 ${
                hoveredItem === "login" ? "text-[#FF4C4C]" : "text-black"
              }`}
            >
              Sign in
            </Link>
            <span className="text-black mx-2">/</span> {/* 여백 조정 */}
            <Link
              to="/signup"
              onMouseEnter={() => handleMouseEnter("signup")}
              onMouseLeave={handleMouseLeave}
              className={`transition-colors duration-300 ${
                hoveredItem === "signup" ? "text-[#FF4C4C]" : "text-black"
              }`}
            >
              Sign up
            </Link>
          </div>
          <Link
            to="/mypage"
            onMouseEnter={() => handleMouseEnter("mypage")}
            onMouseLeave={handleMouseLeave}
            className={`transition-colors duration-300 ml-6 ${
              hoveredItem === "mypage" ? "text-[#FF4C4C]" : "text-black"
            }`} 
          >
            MyPage
          </Link>
        </div>
      </header>
      <nav>
        <ul className="flex flex-wrap justify-center space-x-8 text-lg md:text-xl font-semibold mt-16">
          <li
            onMouseEnter={() => handleMouseEnter("Tourism")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Tourism" ? "text-[#FF4C4C]" : "text-black"
            }`}
          >
            <Link to="/tourism">Tourism</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("Shopping")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Shopping" ? "text-[#FF4C4C]" : "text-black"
            }`}
          >
            <Link to="/shopping">Shopping</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("Restaurant")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Restaurant" ? "text-[#FF4C4C]" : "text-black"
            }`}
          >
            <Link to="/restaurant">Restaurant</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("Accommodation")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Accommodation" ? "text-[#FF4C4C]" : "text-black"
            }`}
          >
            <Link to="/accommodation">Accommodation</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("Bus")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Bus" ? "text-[#FF4C4C]" : "text-black"
            }`}
          >
            <Link to="/bus">Bus</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("Restroom")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Restroom" ? "text-[#FF4C4C]" : "text-black"
            }`}
          >
            <Link to="/restroom">Restroom</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("Wifi")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Wifi" ? "text-[#FF4C4C]" : "text-black"
            }`}
          >
            <Link to="/wifi">Wifi</Link>
          </li>
        </ul>
      </nav>
      <SearchBar />
      <LandmarkSection />
      <TourismSection />
    </div>
  );
}

export default Tourism;
