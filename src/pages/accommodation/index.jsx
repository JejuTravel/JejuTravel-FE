import React, { useState } from "react";
import Header from "../../components/Header";
import Accommolist from './components/accommolist';
import AccommoRecommend from './components/accommorecommend';
import { FaHeart } from 'react-icons/fa'; // Font Awesome 하트 아이콘 가져오기

function Accommodation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [likes, setLikes] = useState({});

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLikeToggle = (index) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [index]: !prevLikes[index]
    }));
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

        {/* 숙박 추천 섹션 (검색어가 없을 때만 표시) */}
        {!searchQuery && <AccommoRecommend />}

        {/* 숙박 목록 섹션 */}
        <div className="mt-8">
          <h2 className="text-[#FF4C4C] text-2xl font-bold mb-4">Accommodation Lists</h2>
          <div>
            {filteredAccommolist.length > 0 ? (
              filteredAccommolist.map((accommodation, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 flex items-center p-4"
                >
                  <img src={accommodation.image} alt={accommodation.name} className="h-32 w-32 object-cover rounded-lg mr-4" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#FF4C4C]">{accommodation.name}</h3>
                    <p className="text-gray-700">{accommodation.location}</p>
                  </div>
                  <button 
                    className="ml-auto bg-transparent border-none cursor-pointer text-red-500"
                    onClick={() => handleLikeToggle(index)}
                  >
                    <FaHeart color={likes[index] ? 'red' : 'gray'} size="1.5em" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No accommodations found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accommodation;