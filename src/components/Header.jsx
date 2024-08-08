import React, { useState } from "react";
import { Link } from "react-router-dom";

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
          <Link
            to="/"
            onMouseEnter={() => handleMouseEnter("login")}
            onMouseLeave={handleMouseLeave}
            className={`transition-colors duration-300 ${
              hoveredItem === "login" ? "text-[#FF4C4C]" : "text-white"
            }`}
          >
            Sign in
          </Link>
          <span className="hidden sm:inline text-white">/</span>
          <Link
            to="/"
            onMouseEnter={() => handleMouseEnter("signup")}
            onMouseLeave={handleMouseLeave}
            className={`transition-colors duration-300 ${
              hoveredItem === "signup" ? "text-[#FF4C4C]" : "text-white"
            }`}
          >
            Sign up
          </Link>
        </div>
      </div>
      <nav>
        <ul className="flex flex-wrap justify-center space-x-8 text-lg md:text-xl font-semibold">
          <li
            onMouseEnter={() => handleMouseEnter("Tourism")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Tourism" ? "text-[#FF4C4C]" : "text-white"
            }`}
          >
            <Link to="/tourism">Tourism</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("Shopping")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Shopping" ? "text-[#FF4C4C]" : "text-white"
            }`}
          >
            <Link to="/shopping">Shopping</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("Restaurant")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Restaurant" ? "text-[#FF4C4C]" : "text-white"
            }`}
          >
            <Link to="/restaurant">Restaurant</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("Accommodation")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Accommodation" ? "text-[#FF4C4C]" : "text-white"
            }`}
          >
            <Link to="/accomodation">Accommodation</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("Bus")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Bus" ? "text-[#FF4C4C]" : "text-white"
            }`}
          >
            <Link to="/bus">Bus</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("Restroom")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Restroom" ? "text-[#FF4C4C]" : "text-white"
            }`}
          >
            <Link to="/restroom">Restroom</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("Wifi")}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-colors duration-300 ${
              hoveredItem === "Wifi" ? "text-[#FF4C4C]" : "text-white"
            }`}
          >
            <Link to="/wifi">Wifi</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
