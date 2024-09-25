import React from "react";
import { MapPin, Phone, BedDouble } from "lucide-react";

function AccommodationSection({ accommodation, onAccommodationClick }) {
  return (
    <div
      className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-indigo-100"
      onClick={() => onAccommodationClick(accommodation.contentId)}
    >
      <div className="relative">
        {accommodation.firstImage ? (
          <img
            src={accommodation.firstImage}
            alt={accommodation.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-indigo-100">
            <BedDouble size={64} className="text-indigo-400" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-xl font-bold text-white line-clamp-2">
            {accommodation.title}
          </h2>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-indigo-700 mb-2">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <p className="text-sm line-clamp-1">{accommodation.address}</p>
        </div>
        <div className="flex items-center text-indigo-700 mb-3">
          <Phone size={16} className="mr-2 flex-shrink-0" />
          <p className="text-sm">
            {accommodation.tel || "无可用电话号码"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {accommodation.benikia && (
            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              贝尼基亚
            </span>
          )}
          {accommodation.goodstay && (
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              好住
            </span>
          )}
          {accommodation.hanok && (
            <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              韩屋
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccommodationSection;
