import React from "react";
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
          未找到符合条件的餐厅。
        </p>
      )}
    </div>
  );
};

const RestaurantItem = ({ item, onItemClick }) => {
  return (
    <div
      className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-orange-100 flex flex-col sm:flex-row"
      onClick={() => onItemClick(item)}
    >
      <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
        {item.firstImage ? (
          <img
            src={item.firstImage}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/api/placeholder/400/300";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-orange-100">
            <Utensils size={64} className="text-orange-400" />
          </div>
        )}
      </div>
      <div className="p-4 sm:p-6 flex-grow flex flex-col justify-center min-h-[12rem]">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#FF6B35] mb-2 line-clamp-2 sm:line-clamp-1">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base mb-2 flex items-start sm:items-center">
          <MapPin className="mr-2 flex-shrink-0 mt-1 sm:mt-0" size={20} />
          <span className="line-clamp-2">{item.address || "无地址信息"}</span>
        </p>
        <p className="text-gray-500 text-sm sm:text-base flex items-center">
          <Phone className="mr-2 flex-shrink-0" size={20} />
          {item.tel || "无电话号码"}
        </p>
      </div>
    </div>
  );
};

export default RestaurantSection;
