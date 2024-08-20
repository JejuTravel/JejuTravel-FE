import React from "react";
import Header from "../../components/Header";
import BusMap from "./components/BusMap";
import BusStopSearch from "./components/BusStopSearch";
import BusStopList from "./components/BusStopList";
import { MapPin, Bus as BusIcon, Search } from "lucide-react";

function Bus() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        {" "}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#FF4C4C] mb-2">
            Jeju Bus Information
          </h1>
          <p className="text-gray-600 text-lg">
            Find your way around Jeju with ease
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#FF4C4C] text-white p-4 flex items-center">
                <MapPin className="mr-2" />
                <h2 className="text-xl font-semibold">Bus Map</h2>
              </div>
              <BusMap />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#FF6B6B] text-white p-4 flex items-center">
                <Search className="mr-2" />
                <h2 className="text-xl font-semibold">Search Bus Stops</h2>
              </div>
              <div className="p-4">
                <BusStopSearch />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#FF8585] text-white p-4 flex items-center">
                <BusIcon className="mr-2" />
                <h2 className="text-xl font-semibold">Bus Stop List</h2>
              </div>
              <div className="p-4">
                <BusStopList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bus;
