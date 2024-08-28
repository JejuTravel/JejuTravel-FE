import React, { useState } from "react";
import { Phone, MapPin, Utensils } from "lucide-react";

const RestaurantSection = ({ items, onItemClick }) => {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <RestaurantItem
          key={item.contentId}
          item={item}
          onItemClick={onItemClick}
        />
      ))}
      {items.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No restaurants found matching your search.
        </p>
      )}
    </div>
  );
};

const RestaurantItem = ({ item, onItemClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const defaultImage = "/api/placeholder/400/300";

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer flex h-48"
      onClick={() => onItemClick(item)}
    >
      <div className="relative w-48 flex-shrink-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        <img
          src={item.firstImage || defaultImage}
          alt={item.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = defaultImage;
            setImageLoaded(true);
          }}
        />
        {(!item.firstImage || item.firstImage === "") && imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <Utensils className="text-gray-400 w-12 h-12" />
          </div>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-[#FF6B35] mb-2 line-clamp-1">
          {item.title}
        </h3>
        <p className="text-gray-600 text-base mb-2 flex items-center line-clamp-2">
          <MapPin className="mr-2 flex-shrink-0" size={20} />{" "}
          {item.address || "Address not available"}
        </p>
        <p className="text-gray-500 text-base flex items-center">
          <Phone className="mr-2 flex-shrink-0" size={20} />{" "}
          {item.tel || "No phone number available"}
        </p>
      </div>
    </div>
  );
};

export default RestaurantSection;
