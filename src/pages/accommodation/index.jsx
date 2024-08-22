// src/pages/accomodation/index.jsx
import React, { useState } from "react";
import Header from "../../components/Header";
import Accommolist from './components/accommolist';
import AccommoRecommend from './components/accommorecommend'; // 올바른 경로로 임포트

function Accommodation() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredAccommolist = Accommolist.filter(acc =>
    acc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFFBFC]">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <input
              type="text"
              className="w-full md:w-2/3 p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF4C4C]"
              placeholder="Search for Accommodations..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="p-4 bg-[#FF4C4C] text-white rounded-r-lg hover:bg-[#007965]">
              SEARCH
            </button>
          </div>
        </div>

        <AccommoRecommend />

        <div className="bg-white p-4 rounded-lg shadow-lg mt-8">
          {filteredAccommolist.length > 0 ? (
            filteredAccommolist.map((accommodation, index) => (
              <div 
                key={index}
                className="flex items-center space-x-4 p-4 mb-4 bg-gray-100 rounded-lg cursor-pointer"
              >
                <img src={accommodation.image} alt={accommodation.name} className="h-24 w-24 object-cover rounded-lg" />
                <div>
                  <h3 className="text-xl font-semibold text-[#FF4C4C]">{accommodation.name}</h3>
                  <p className="text-gray-700">{accommodation.location}</p>
                </div>
                <button className="ml-auto bg-transparent border-none cursor-pointer text-red-500">
                  <i className="fas fa-heart"></i>
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No accommodations found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Accommodation;
