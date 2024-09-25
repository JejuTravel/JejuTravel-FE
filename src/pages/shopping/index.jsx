import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ShoppingSection from "./components/ShoppingSection";
import TouristInfoSearch from "../../components/TouristInfoSearch";
import { getShoppingList, searchShopping } from "../../apis";
import { Loader } from "lucide-react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

function Shopping() {
  const [shoppingData, setShoppingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const loader = useRef(null);

  const fetchShoppingData = useCallback(
    async (query = searchTerm, pageNum = page) => {
      if (loading || !hasMore) return;
      setLoading(true);
      setError(null);
      try {
        const response = query
          ? await searchShopping(query, pageNum)
          : await getShoppingList(pageNum);
        const newItems = response.data.data.content;
        if (newItems.length === 0) {
          setHasMore(false);
        } else {
          setShoppingData((prev) =>
            pageNum === 1 ? newItems : [...prev, ...newItems]
          );
          setPage((prevPage) => prevPage + 1);
        }
      } catch (err) {
        console.error("Error fetching shopping data:", err);
        setError("加载购物信息失败。");
      }
      setLoading(false);
    },
    [searchTerm, page, loading, hasMore]
  );

  useEffect(() => {
    fetchShoppingData("", 1);
  }, []);

  useInfiniteScroll(loader, () => fetchShoppingData());

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setShoppingData([]);
    setPage(1);
    setHasMore(true);
    fetchShoppingData(searchTerm, 1);
  };

  const handleItemClick = (item) => {
    navigate(`/shopping/${item.contentId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#FF4C4C] mb-2">
            济州购物
          </h1>
          <p className="text-gray-600 text-lg">
            探索济州岛最佳购物体验
          </p>
        </div>

        <TouristInfoSearch
          title="搜索购物"
          placeholder="搜索购物..."
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />

        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100 p-3 rounded-lg animate-fade-in">
            {error}
          </p>
        )}

        {shoppingData.length === 0 && !loading && (
          <p className="text-gray-500 text-center mb-4">
            未找到结果。请尝试使用不同的搜索词。
          </p>
        )}

        <div className="space-y-6 animate-fade-in">
          <ShoppingSection items={shoppingData} onItemClick={handleItemClick} />
        </div>

        {loading && (
          <div className="text-center mt-8">
            <Loader className="animate-spin text-[#FF4C4C] mx-auto" />
          </div>
        )}

        {!hasMore && shoppingData.length > 0 && (
          <p className="text-center text-gray-500 mt-4">
            没有更多内容可加载
          </p>
        )}
        <div ref={loader} />
      </div>
    </div>
  );
}

export default Shopping;
