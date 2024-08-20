import React, { useState } from "react";
import Header from "../../components/Header";
import ShoppingSection from './components/shoppingSection'; 
import ShoppingDetail from './components/shoppingdetail'; // 새로운 상세 컴포넌트

function Shopping() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item); // 아이템이 클릭되면 해당 아이템을 상태로 저장
  };

  const handleBackClick = () => {
    setSelectedItem(null); // 뒤로가기 클릭 시 선택된 아이템 초기화
  };

  return (
    <div className="min-h-screen bg-[#FFFBFC]">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        {!selectedItem ? (
          <div>
            <div className="text-center mb-12">
              <div className="flex justify-center items-center mb-4">
                <input
                  type="text"
                  className="w-full md:w-2/3 p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF4C4C]"
                  placeholder="search for shopping..."
                />
                <button className="p-4 bg-[#FF4C4C] text-white rounded-r-lg hover:bg-[#007965]">
                  SEARCH
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-3xl font-extrabold text-[#FF4C4C] mb-4">Recommended Stores</h2>
              <ShoppingSection onItemClick={handleItemClick} /> {/* 아이템 클릭 핸들러 전달 */}
            </div>
          </div>
        ) : (
          <ShoppingDetail item={selectedItem} onBackClick={handleBackClick} /> // 상세 페이지 렌더링
        )}
      </div>
    </div>
  );
}

export default Shopping;
