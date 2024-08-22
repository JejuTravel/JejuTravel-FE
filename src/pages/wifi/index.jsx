import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Map from "../../components/Map";
import Search from "../../components/Search";
import List from "../../components/List";
import {
  MapPin,
  Wifi as WifiIcon,
  Search as SearchIcon,
  Loader,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getPublicWifi, searchPublicWifi } from "../../apis";

function Wifi() {
  const [wifiSpots, setWifiSpots] = useState([]);
  const [hoveredWifi, setHoveredWifi] = useState(null);
  const [selectedWifi, setSelectedWifi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchWifiSpots();
  }, [pageNo]);

  const fetchWifiSpots = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPublicWifi(pageNo);
      if (response.data && response.data.data && response.data.data.content) {
        const { content, totalCount, numOfRows } = response.data.data;
        setWifiSpots(content);
        setTotalPages(Math.ceil(totalCount / numOfRows));
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (error) {
      console.error("Error fetching wifi spots:", error);
      setError("Failed to fetch wifi spots. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (apGroupName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await searchPublicWifi(apGroupName);
      if (response.data && response.data.data && response.data.data.content) {
        const { content, totalCount, numOfRows } = response.data.data;
        setWifiSpots(content);
        setTotalPages(Math.ceil(totalCount / numOfRows));
        setPageNo(1);
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (error) {
      console.error("Error searching wifi spots:", error);
      setError("Failed to search wifi spots. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHover = (wifi) => {
    setHoveredWifi(wifi);
  };

  const handleClick = (wifi) => {
    setSelectedWifi(wifi);
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
            Jeju Public Wi-Fi Information
          </h1>
          <p className="text-gray-600 text-lg">
            Find all Public Wi-Fi Spots in Jeju
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-[#FF4C4C] text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="mr-2" />
                  <h2 className="text-xl font-semibold">Wi-Fi Map</h2>
                </div>
              </div>
              <Map
                items={wifiSpots}
                hoveredItem={hoveredWifi}
                selectedItem={selectedWifi}
                itemKey="apGroupName"
                latitudeKey="latitude"
                longitudeKey="longitude"
                nameKey="apGroupName"
                addressKey="addressDetail"
                extraInfoKey="installLocationDetail"
              />
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#FF6B6B] text-white p-4 flex items-center">
                <SearchIcon className="mr-2" />
                <h2 className="text-xl font-semibold">Search Wi-Fi Spots</h2>
              </div>
              <div className="p-4">
                <Search
                  onSearch={handleSearch}
                  placeholder="Search for Wi-Fi..."
                />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#FF8585] text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <WifiIcon className="mr-2" />
                  <h2 className="text-xl font-semibold">Wi-Fi Spots</h2>
                </div>
                {isLoading && <Loader className="animate-spin" />}
              </div>
              <div className="p-4">
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && (
                  <List
                    items={wifiSpots}
                    onHover={handleHover}
                    onClick={handleClick}
                    itemKey="apGroupName"
                    nameKey="apGroupName"
                    addressKey="addressDetail"
                    extraInfoKey="installLocationDetail"
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

export default Wifi;
