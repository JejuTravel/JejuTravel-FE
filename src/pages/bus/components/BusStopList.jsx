import React from "react";

function BusStopList({ busStops, onHover, onClick }) {
  return (
    <div className="overflow-y-auto max-h-96">
      {busStops.length === 0 ? (
        <p>No bus stops found.</p>
      ) : (
        <ul>
          {busStops.map((stop) => (
            <li
              key={stop.stationId}
              className="mb-4 p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onMouseEnter={() => onHover(stop)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onClick(stop)}
            >
              <h3 className="font-semibold text-lg">{stop.stationName}</h3>
              <p className="text-sm text-gray-600">{stop.stationAddress}</p>
              <p className="text-xs text-gray-500 mt-1">{stop.localInfo}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BusStopList;
