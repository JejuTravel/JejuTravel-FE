import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import RestaurantSection from "./components/RestaurantSection";
import TouristInfoSearch from "../../components/TouristInfoSearch";
import { getRestaurantList, searchRestaurant } from "../../apis";
import { Loader } from "lucide-react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

function Restaurant() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const loader = useRef(null);

  const fetchRestaurantData = useCallback(
    async (query = searchTerm, pageNum = page) => {
      if (loading || !hasMore) return;
      setLoading(true);
      setError(null);
      try {
        const response = query
          ? await searchRestaurant(query, pageNum)
          : await getRestaurantList(pageNum);
        const newItems = response.data.data.content;
        if (newItems.length === 0) {
          setHasMore(false);
        } else {
          setRestaurantData((prev) =>
            pageNum === 1 ? newItems : [...prev, ...newItems]
          );
          setPage((prevPage) => prevPage + 1);
        }
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
        setError("无法加载餐厅信息。");
      }
      setLoading(false);
    },
    [searchTerm, page, loading, hasMore]
  );

  useEffect(() => {
    fetchRestaurantData("", 1);
  }, []);

  useInfiniteScroll(loader, () => fetchRestaurantData());

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setRestaurantData([]);
    setPage(1);
    setHasMore(true);
    fetchRestaurantData(searchTerm, 1);
  };

  const handleItemClick = (item) => {
    navigate(`/restaurant/${item.contentId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#FF6B35] mb-2">
            济州岛餐厅
          </h1>
          <p className="text-gray-600 text-lg">
            发现济州岛最好的餐饮体验
          </p>
        </div>

        <TouristInfoSearch
          title="搜索餐厅"
          placeholder="搜索餐厅..."
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />

        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100 p-3 rounded-lg animate-fade-in">
            {error}
          </p>
        )}

        {restaurantData.length === 0 && !loading && (
          <p className="text-gray-500 text-center mb-4">
            未找到结果。请尝试使用其他搜索词。
          </p>
        )}

        <div className="space-y-6 animate-fade-in">
          <RestaurantSection
            items={restaurantData}
            onItemClick={handleItemClick}
          />
        </div>

        {loading && (
          <div className="text-center mt-8">
            <Loader className="animate-spin text-[#FF6B35] mx-auto" />
          </div>
        )}

        {!hasMore && restaurantData.length > 0 && (
          <p className="text-center text-gray-500 mt-4">
            没有更多内容可加载
          </p>
        )}
        <div ref={loader} />
      </div>
    </div>
  );
}

export default Restaurant;
