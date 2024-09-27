import React from "react";
import { MapPin, Phone, Camera } from "lucide-react";

function TourismSection({ event, onEventClick }) {
  return (
    <div
      className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-red-100"
      onClick={() => onEventClick(event.contentId)}
    >
      <div className="relative">
        {event.firstImage ? (
          <img
            src={event.firstImage}
            alt={event.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/api/placeholder/400/300";
            }}
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-red-100">
            <Camera size={64} className="text-red-400" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-xl font-bold text-white line-clamp-2">
            {event.title}
          </h2>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-red-700 mb-2">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <p className="text-sm line-clamp-1">{event.address}</p>
        </div>
        <div className="flex items-center text-red-700 mb-3">
          <Phone size={16} className="mr-2 flex-shrink-0" />
          <p className="text-sm">{event.tel || "无可用电话号码"}</p>
        </div>
      </div>
    </div>
  );
}

export default TourismSection;
