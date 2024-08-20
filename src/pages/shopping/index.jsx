import React from "react";
import Header from "../../components/Header";
import ShoppingSection from './components/shoppingSection'; // 쇼핑 섹션 컴포넌트 가져오기

function Shopping() {
  return (
    <div className="min-h-screen bg-[#FFFBFC]">
      <Header />
      <div className="container mx-auto mt-32 p-6">
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
          <ShoppingSection /> {/* 추천 상점 섹션 */}
        </div>
      </div>
    </div>
  );
}

export default Shopping;
