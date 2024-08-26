import React, { useState } from "react";

const TourismSection = ({ event, onEventClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const defaultImage = "/api/placeholder/400/300";

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={() => onEventClick(event.contentId)}
    >
      <div className="relative h-48 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        <img
          src={event.firstImage || defaultImage}
          alt={event.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = defaultImage;
            setImageLoaded(true);
          }}
        />
        {(!event.firstImage || event.firstImage === "") && imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500 text-lg">No Image Available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#FF4C4C] mb-2 truncate">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {event.address}
        </p>
        <p className="text-gray-500 text-xs">
          {event.tel || "No phone number available"}
        </p>
      </div>
    </div>
  );
};

export default TourismSection;
