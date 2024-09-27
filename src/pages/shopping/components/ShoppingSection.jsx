import React from "react";
import { Phone, MapPin, ShoppingBag } from "lucide-react";

const ShoppingSection = ({ items, onItemClick }) => {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <ShoppingItem
          key={item.contentId}
          item={item}
          onItemClick={onItemClick}
        />
      ))}
      {items.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          没有找到符合搜索条件的商店。
        </p>
      )}
    </div>
  );
};

const ShoppingItem = ({ item, onItemClick }) => {
  return (
    <div
      className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-pink-100 flex h-48"
      onClick={() => onItemClick(item)}
    >
      <div className="relative w-48 flex-shrink-0">
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
          <div className="w-full h-full flex items-center justify-center bg-pink-100">
            <ShoppingBag size={64} className="text-pink-400" />
          </div>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-[#FF4C4C] mb-2 line-clamp-1">
          {item.title}
        </h3>
        <p className="text-gray-600 text-base mb-2 flex items-center line-clamp-2">
          <MapPin className="mr-2 flex-shrink-0" size={20} />
          {item.address || "地址不可用"}
        </p>
        <p className="text-gray-500 text-base flex items-center">
          <Phone className="mr-2 flex-shrink-0" size={20} />
          {item.tel || "电话号码不可用"}
        </p>
      </div>
    </div>
  );
};

export default ShoppingSection;
