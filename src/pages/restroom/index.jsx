import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Map from "../../components/Map";
import Search from "../../components/Search";
import List from "../../components/List";
import { getPublicToilets, searchPublicToilets } from "../../apis";
import { FaMapMarkerAlt, FaToilet, FaSearch } from "react-icons/fa";
import { Loader, ChevronLeft, ChevronRight } from "lucide-react";

function Restroom() {
  const [restrooms, setRestrooms] = useState([]);
  const [hoveredRestroom, setHoveredRestroom] = useState(null);
  const [selectedRestroom, setSelectedRestroom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRestrooms();
  }, [pageNo]);

  const fetchRestrooms = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPublicToilets(pageNo);
      if (response.data && response.data.data && response.data.data.content) {
        const { content, totalCount, numOfRows } = response.data.data;
        setRestrooms(content);
        setTotalPages(Math.ceil(totalCount / numOfRows));
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (error) {
      console.error("Error fetching restrooms:", error);
      setError("Failed to fetch restrooms. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (toiletName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await searchPublicToilets(toiletName);
      if (response.data && response.data.data && response.data.data.content) {
        const { content, totalCount, numOfRows } = response.data.data;
        setRestrooms(content);
        setTotalPages(Math.ceil(totalCount / numOfRows));
        setPageNo(1);
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (error) {
      console.error("Error searching restrooms:", error);
      setError("Failed to search restrooms. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHover = (restroom) => {
    setHoveredRestroom(restroom);
  };

  const handleClick = (restroom) => {
    setSelectedRestroom(restroom);
  };

  const handlePageChange = (newPage) => {
    setPageNo(newPage);
  };

  const renderPagination = () => {
    const indicators = [];
    const maxIndicators = 5;

    for (let i = 1; i <= Math.min(maxIndicators, totalPages); i++) {
      indicators.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-3 h-3 rounded-full mx-1 transition-all duration-200 ${
            (i === pageNo && pageNo <= maxIndicators) ||
            (i === maxIndicators && pageNo > maxIndicators)
              ? "bg-[#FF4C4C] scale-125"
              : "bg-gray-300 hover:bg-[#FF8585] hover:scale-110"
          }`}
          aria-label={`Go to page ${i}`}
        ></button>
      );
    }

    return (
      <div className="flex items-center justify-center mt-6 bg-white p-4 rounded-lg shadow-md">
        <button
          onClick={() => handlePageChange(Math.max(1, pageNo - 1))}
          disabled={pageNo === 1}
          className="p-2 mr-4 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center">{indicators}</div>
        <button
          onClick={() => handlePageChange(Math.min(totalPages, pageNo + 1))}
          disabled={pageNo === totalPages}
          className="p-2 ml-4 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#FF4C4C] mb-2">
            Jeju Public Restrooms
          </h1>
          <p className="text-gray-600 text-lg">
            Find all Public Restrooms in Jeju
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-[#FF4C4C] text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <h2 className="text-xl font-semibold">Restroom Map</h2>
                </div>
              </div>
              <Map
                items={restrooms}
                hoveredItem={hoveredRestroom}
                selectedItem={selectedRestroom}
                itemKey="toiletNm"
                latitudeKey="laCrdnt"
                longitudeKey="loCrdnt"
                nameKey="toiletNm"
                addressKey="rnAdres"
              />
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#FF6B6B] text-white p-4 flex items-center">
                <FaSearch className="mr-2" />
                <h2 className="text-xl font-semibold">
                  Search Public Restrooms
                </h2>
              </div>
              <div className="p-4">
                <Search
                  onSearch={handleSearch}
                  placeholder="Search for public restroom..."
                />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#FF8585] text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <FaToilet className="mr-2" />
                  <h2 className="text-xl font-semibold">Public Restrooms</h2>
                </div>
                {isLoading && <Loader className="animate-spin" />}
              </div>
              <div className="p-4">
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && (
                  <List
                    items={restrooms}
                    onHover={handleHover}
                    onClick={handleClick}
                    itemKey="toiletNm"
                    nameKey="toiletNm"
                    addressKey="rnAdres"
                    extraInfoKey="emdNm"
                  />
                )}
              </div>
              {renderPagination()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restroom;
