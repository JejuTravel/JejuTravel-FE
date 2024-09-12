import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Bed,
} from "lucide-react";

function HomeAccommodation({ accommodationData, isLoading }) {
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

  const handleItemClick = (contentId) => {
    navigate(`/accommodation/${contentId}`);
  };

  const renderAccommodationCard = (item, index) => (
    <div
      key={index}
      className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={() => handleItemClick(item.contentId)}
    >
      {item.firstImage ? (
        <img
          src={item.firstImage}
          alt={item.title}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div
          className="w-full h-40 bg-base-200 flex items-center justify-center"
          aria-label="No image available"
        >
          <Bed size={48} className="text-base-content opacity-20" />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{item.title}</h3>
        <div className="flex items-center mt-2 text-sm text-base-content/70">
          <MapPin size={16} className="mr-2" />
          <span className="truncate">{item.address}</span>
        </div>
        {item.tel && (
          <div className="flex items-center mt-2 text-sm text-base-content/70">
            <Phone size={16} className="mr-2" />
            <span>{item.tel}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderAccommodations = () => {
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

    return accommodationData.map(renderAccommodationCard);
  };

  return (
    <section className="pt-12 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-base-content">
            Where to <span className="text-[#FF4C4C]">Stay</span> in Jeju
          </h2>
          <div className="space-x-4">
            <Link
              to="/accommodation"
              className="px-6 py-2 bg-[#FF4C4C] text-white rounded-full hover:bg-[#FF6B6B] transition duration-300 shadow-md hover:shadow-lg"
            >
              Explore All Accommodations
            </Link>
          </div>
        </div>
        <p className="text-lg text-base-content/80 mb-8">
          Discover comfort and luxury in the heart of nature
        </p>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
          >
            {renderAccommodations()}
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

export default HomeAccommodation;
