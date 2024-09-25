import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Map from "../../components/Map";
import Search from "../../components/Search";
import List from "../../components/List";
import {
  MapPin,
  Bus as BusIcon,
  Search as SearchIcon,
  Loader,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getBusStops, searchBusStops } from "../../apis";

function Bus() {
  const [busStops, setBusStops] = useState([]);
  const [hoveredStop, setHoveredStop] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBusStops();
  }, [pageNo]);

  const fetchBusStops = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getBusStops(pageNo);
      if (response.data && response.data.data && response.data.data.content) {
        const { content, totalCount, numOfRows } = response.data.data;
        setBusStops(content);
        setTotalPages(Math.ceil(totalCount / numOfRows));
      } else {
        throw new Error("API 响应结构不符合预期");
      }
    } catch (error) {
      console.error("获取公交站点时出错:", error);
      setError("获取公交站点失败，请稍后再试。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (stationName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await searchBusStops(stationName);
      if (response.data && response.data.data && response.data.data.content) {
        const { content, totalCount, numOfRows } = response.data.data;
        setBusStops(content);
        setTotalPages(Math.ceil(totalCount / numOfRows));
        setPageNo(1);
      } else {
        throw new Error("API 响应结构不符合预期");
      }
    } catch (error) {
      console.error("搜索公交站点时出错:", error);
      setError("搜索公交站点失败，请再试一次。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHover = (stop) => {
    setHoveredStop(stop);
  };

  const handleClick = (stop) => {
    setSelectedStop(stop);
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
          aria-label={`跳到第 ${i} 页`}
        ></button>
      );
    }

    return (
      <div className="flex items-center justify-center mt-6 bg-white p-4 rounded-lg shadow-md">
        <button
          onClick={() => handlePageChange(Math.max(1, pageNo - 1))}
          disabled={pageNo === 1}
          className="p-2 mr-4 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="上一页"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center">{indicators}</div>
        <button
          onClick={() => handlePageChange(Math.min(totalPages, pageNo + 1))}
          disabled={pageNo === totalPages}
          className="p-2 ml-4 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="下一页"
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
            济州公交信息
          </h1>
          <p className="text-gray-600 text-lg">查找济州的所有公交站点</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-[#FF4C4C] text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="mr-2" />
                  <h2 className="text-xl font-semibold">公交地图</h2>
                </div>
              </div>
              <Map
                items={busStops}
                hoveredItem={hoveredStop}
                selectedItem={selectedStop}
                itemKey="stationId"
                latitudeKey="latitude"
                longitudeKey="longitude"
                nameKey="stationName"
                addressKey="stationAddress"
              />
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#FF6B6B] text-white p-4 flex items-center">
                <SearchIcon className="mr-2" />
                <h2 className="text-xl font-semibold">搜索公交站点</h2>
              </div>
              <div className="p-4">
                <Search
                  onSearch={handleSearch}
                  placeholder="搜索公交站点..."
                />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#FF8585] text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <BusIcon className="mr-2" />
                  <h2 className="text-xl font-semibold">公交站点</h2>
                </div>
                {isLoading && <Loader className="animate-spin" />}
              </div>
              <div className="p-4">
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && (
                  <List
                    items={busStops}
                    onHover={handleHover}
                    onClick={handleClick}
                    itemKey="stationId"
                    nameKey="stationName"
                    addressKey="stationAddress"
                    extraInfoKey="localInfo"
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

export default Bus;
