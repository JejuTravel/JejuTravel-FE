import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => setHoveredItem(item);
  const handleMouseLeave = () => setHoveredItem(null);

  const navItems = [
    { name: "Tourism", link: "/tourism" },
    { name: "Shopping", link: "/shopping" },
    { name: "Restaurant", link: "/restaurant" },
    { name: "Accommodation", link: "/accommodation" },
    { name: "Bus", link: "/bus" },
    { name: "Restroom", link: "/restroom" },
    { name: "Wifi", link: "/wifi" },
  ];

  return (
    <header className="p-4 fixed top-0 left-0 w-full z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="text-4xl font-bold text-[#FF4C4C]">JEJU TRAVEL</div>
          <div className="flex space-x-4">
            <Link
              to="/"
              onMouseEnter={() => handleMouseEnter("login")}
              onMouseLeave={handleMouseLeave}
              className={`btn btn-ghost btn-sm ${
                hoveredItem === "login" ? "text-[#FF4C4C]" : "text-gray-700"
              }`}
            >
              Login
            </Link>
            <Link
              to="/"
              onMouseEnter={() => handleMouseEnter("signup")}
              onMouseLeave={handleMouseLeave}
              className={`btn btn-ghost btn-sm ${
                hoveredItem === "signup" ? "text-[#FF4C4C]" : "text-gray-700"
              }`}
            >
              SignUp
            </Link>
          </div>
        </div>
        <nav>
          <ul className="flex flex-wrap justify-center space-x-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                  className={`btn btn-ghost btn-sm ${
                    hoveredItem === item.name
                      ? "text-[#FF4C4C] bg-red-100"
                      : "text-gray-700 hover:bg-red-50"
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
