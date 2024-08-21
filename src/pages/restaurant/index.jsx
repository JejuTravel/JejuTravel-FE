import React, { useState } from "react";
import Header from "../../components/Header";
import RestaurantSection from './components/restaurantSection'; 
import RestaurantDetail from './components/restaurantDetail'; // 상세 페이지 컴포넌트 가져오기

function Restaurant() {
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 관리
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 항목 상태 관리

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    window.scrollTo(0, 0); // 스크롤을 맨 위로 이동
  };

  const handleBackClick = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFBFC]">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        {!selectedItem ? (
          <>
            <div className="text-center mb-12">
              <div className="flex justify-center items-center mb-4">
                <input
                  type="text"
                  className="w-full md:w-2/3 p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF4C4C]"
                  placeholder="search for restaurant..."
                  value={searchQuery}
                  onChange={handleSearchChange} 
                />
                <button className="p-4 bg-[#FF4C4C] text-white rounded-r-lg hover:bg-[#007965]">
                  SEARCH
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-3xl font-extrabold text-[#FF4C4C] mb-4">Recommended Restaurants</h2>
              <RestaurantSection searchQuery={searchQuery} onItemClick={handleItemClick} /> {/* 검색어와 클릭 이벤트 전달 */}
            </div>
          </>
        ) : (
          <RestaurantDetail item={selectedItem} onBackClick={handleBackClick} />
        )}
      </div>
    </div>
  );
}

export default Restaurant;
