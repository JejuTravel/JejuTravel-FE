import React from "react";
import { Search } from "lucide-react";

function TouristInfoSearch({
  title,
  placeholder,
  searchTerm,
  onSearchChange,
  onSearch,
}) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(event);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      <div className="bg-[#FF6B6B] text-white p-4 flex items-center">
        <Search className="mr-2" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="p-4">
        <div className="flex items-center">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#FF4C4C] focus:border-transparent"
            placeholder={placeholder}
            value={searchTerm}
            onChange={onSearchChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="p-2 bg-[#FF4C4C] text-white rounded-r-md hover:bg-[#FF6B6B] transition duration-300"
            onClick={onSearch}
          >
            搜索
          </button>
        </div>
      </div>
    </div>
  );
}

export default TouristInfoSearch;
