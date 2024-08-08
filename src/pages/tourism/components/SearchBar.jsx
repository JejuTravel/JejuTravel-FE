import React from "react";

const SearchBar = () => {
  return (
    <div className="flex justify-center mt-4 mb-4">
      <input 
        type="text" 
        className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4C4C]" 
        placeholder="please write down here about tourism..." 
      />
      <button className="ml-2 p-2 bg-[#FF4C4C] text-white rounded-lg hover:bg-[#007965]">
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
