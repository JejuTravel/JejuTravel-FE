import React from "react";
import Header from "../../components/Header";
import LandmarkSection from './components/landmarkSection';
import TourismSection from './components/tourismSection';

function Tourism() {
  return (
    <div className="min-h-screen bg-[#FFFBFC]">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <input
              type="text"
              className="w-full md:w-2/3 p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF4C4C]"
              placeholder="Search Jeju Tourism Information..."
            />
            <button className="p-4 bg-[#FF4C4C] text-white rounded-r-lg hover:bg-[#007965]">
              SEARCH
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
          <LandmarkSection />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <TourismSection />
        </div>
      </div>
    </div>
  );
}

export default Tourism;
