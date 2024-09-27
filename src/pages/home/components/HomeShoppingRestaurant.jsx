import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Coffee,
  Image as ImageIcon,
} from "lucide-react";

function HomeShoppingRestaurant({
  shoppingData,
  restaurantData,
  isLoadingShopping,
  isLoadingRestaurant,
}) {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      const newScrollPosition =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newScrollPosition, behavior: "smooth" });
    }
  };

  const handleItemClick = (type, contentId) => {
    navigate(`/${type}/${contentId}`);
  };

  const renderItems = (items, isLoading, type) => {
    if (isLoading) {
      return Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 h-64 bg-base-200 animate-pulse rounded-xl"
          ></div>
        ));
    }
    return items.map((item, index) => (
      <div
        key={index}
        className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
        onClick={() => handleItemClick(type.toLowerCase(), item.contentId)}
      >
        {item.firstImage ? (
          <img
            src={item.firstImage}
            alt={item.title}
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-base-200 flex items-center justify-center">
            <ImageIcon size={48} className="text-base-content opacity-20" />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{item.title}</h3>
          <div className="flex items-center mt-2 text-sm text-base-content/70">
            {type === "Shopping" ? (
              <ShoppingBag size={16} className="mr-2" />
            ) : (
              <Coffee size={16} className="mr-2" />
            )}
            <span>{type === "Shopping" ? "购物" : "餐馆"}</span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section className="pt-10 pb-18">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <h2 className="text-4xl font-bold text-base-content">
            <span className="text-[#FF4C4C]">购物</span> 和
            <span className="text-[#FF4C4C]"> 餐馆</span>
          </h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Link
              to="/shopping"
              className="px-6 py-2 bg-[#FF4C4C] text-white rounded-full hover:bg-[#FF6B6B] transition duration-300 shadow-md hover:shadow-lg text-center"
            >
              探索济州商店
            </Link>
            <Link
              to="/restaurant"
              className="px-6 py-2 bg-[#FF4C4C] text-white rounded-full hover:bg-[#FF6B6B] transition duration-300 shadow-md hover:shadow-lg text-center"
            >
              探索济州餐馆
            </Link>
          </div>
        </div>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
          >
            {renderItems(shoppingData, isLoadingShopping, "Shopping")}
            {renderItems(restaurantData, isLoadingRestaurant, "Restaurant")}
          </div>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-md transition-all duration-200 ease-in-out"
          >
            <ChevronLeft size={24} className="text-base-content" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-md transition-all duration-200 ease-in-out"
          >
            <ChevronRight size={24} className="text-base-content" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeShoppingRestaurant;
