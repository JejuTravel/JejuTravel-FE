import React, { useState } from "react";

function Search({ onSearch, placeholder }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF4C4C]"
        />
        <button
          type="submit"
          className="bg-[#FF4C4C] text-white px-4 py-2 rounded-r-lg hover:bg-[#FF6B6B] transition-colors duration-300"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;
