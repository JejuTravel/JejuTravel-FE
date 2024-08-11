import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "react-feather";
import jejuImage from "../../../assets/jeju.jpg";

function HomeShoppingRestaurant() {
  const scrollContainerRef = useRef(null);

  const items = [
    { name: "ABC MART", image: jejuImage, type: "shopping" },
    { name: "XYZ Restaurant", image: jejuImage, type: "restaurant" },
    { name: "123 Shop", image: jejuImage, type: "shopping" },
    { name: "456 Cafe", image: jejuImage, type: "restaurant" },
    { name: "789 Store", image: jejuImage, type: "shopping" },
  ];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300; // Adjust this value as needed
      const newScrollPosition =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="container mx-auto py-16 px-4">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-[#FF4C4C]">
            Shopping & Restaurants
          </h2>
          <div className="space-x-4">
            <Link
              to="/shopping"
              className="btn btn-sm bg-[#FF4C4C] hover:bg-[#FF6B6B] text-white border-none"
            >
              Explore Jeju Shops
            </Link>
            <Link
              to="/restaurant"
              className="btn btn-sm bg-[#FF4C4C] hover:bg-[#FF6B6B] text-white border-none"
            >
              Explore Jeju Restaurants
            </Link>
          </div>
        </div>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide"
          >
            {items.map((item, index) => (
              <div key={index} className="flex-none w-64">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600 capitalize">{item.type}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200 ease-in-out"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200 ease-in-out"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeShoppingRestaurant;
