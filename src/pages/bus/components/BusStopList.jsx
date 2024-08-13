import React from "react";

function BusStopList() {
  const busStops = [{ id: 1, name: "JejuAirport" }];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Bus Stop</h2>
      <ul>
        {busStops.map((stop) => (
          <li
            key={stop.id}
            className="mb-2 p-2 hover:bg-gray-100 rounded transition-colors duration-200"
          >
            {stop.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BusStopList;
