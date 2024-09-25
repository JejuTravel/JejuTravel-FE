import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccommodationList, searchAccommodation } from "../../apis";
import Header from "../../components/Header";
import AccommodationSection from "./components/AccommodationSection";
import TouristInfoSearch from "../../components/TouristInfoSearch";
import { Loader } from "lucide-react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

function Accommodation() {
  const [accommodations, setAccommodations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [stayType, setStayType] = useState("");
  const [sigunguCode, setSigunguCode] = useState("");
  const navigate = useNavigate();
  const loader = useRef(null);

  const loadMore = useCallback(
    async (query = searchQuery, pageNum = page) => {
      if (loading || (!hasMore && pageNum === page)) return;
      setLoading(true);
      try {
        const response = query
          ? await searchAccommodation(query, pageNum)
          : await getAccommodationList(pageNum, sigunguCode, stayType);
        const newAccommodations = response.data.data.content;
        if (newAccommodations.length === 0) {
          setHasMore(false);
        } else {
          setAccommodations((prevAccommodations) =>
            pageNum === 1
              ? newAccommodations
              : [...prevAccommodations, ...newAccommodations]
          );
          setPage((prevPage) => (pageNum === 1 ? 2 : prevPage + 1));
        }
      } catch (err) {
        console.error("住宿数据加载出错：", err);
        setError("加载住宿信息失败。");
      }
      setLoading(false);
    },
    [searchQuery, page, loading, hasMore, sigunguCode, stayType]
  );

  const handleSearch = useCallback(
    (event) => {
      event.preventDefault();
      setPage(1);
      setAccommodations([]);
      setHasMore(true);
      loadMore(searchQuery, 1);
    },
    [searchQuery, loadMore]
  );

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleStayTypeChange = useCallback((event) => {
    setStayType(event.target.value);
    setPage(1);
    setAccommodations([]);
    setHasMore(true);
  }, []);

  const handleSigunguCodeChange = useCallback((event) => {
    setSigunguCode(event.target.value);
    setPage(1);
    setAccommodations([]);
    setHasMore(true);
  }, []);

  useEffect(() => {
    loadMore("", 1);
  }, [stayType, sigunguCode]);

  useInfiniteScroll(loader, () => loadMore(searchQuery));

  const handleAccommodationClick = useCallback(
    (contentId) => {
      navigate(`/accommodation/${contentId}`);
    },
    [navigate]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#4A90E2] mb-2">
            济州住宿
          </h1>
          <p className="text-gray-600 text-lg">
            找到您在济州的完美住宿地点
          </p>
        </div>

        <TouristInfoSearch
          title="搜索住宿"
          placeholder="搜索住宿..."
          searchTerm={searchQuery}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />

        <div className="mt-4 mb-8 flex flex-wrap gap-4 justify-start">
          <select
            value={stayType}
            onChange={handleStayTypeChange}
            className="p-2 border rounded-md bg-white text-gray-700"
          >
            <option value="">所有住宿类型</option>
            <option value="benikia">贝尼基亚</option>
            <option value="goodstay">好住</option>
            <option value="hanok">韩屋</option>
          </select>
          <select
            value={sigunguCode}
            onChange={handleSigunguCodeChange}
            className="p-2 border rounded-md bg-white text-gray-700"
          >
            <option value="">所有地区</option>
            <option value="3">西归浦市</option>
            <option value="4">济州市</option>
          </select>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100 p-3 rounded-lg animate-fade-in">
            {error}
          </p>
        )}

        {accommodations.length === 0 && !loading && (
          <p className="text-gray-500 text-center mb-4 bg-gray-50 p-3 rounded-lg">
            未找到结果。请尝试使用不同的搜索词或过滤条件。
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {accommodations.map((accommodation) => (
            <AccommodationSection
              key={accommodation.contentId}
              accommodation={accommodation}
              onAccommodationClick={handleAccommodationClick}
            />
          ))}
        </div>

        {loading && (
          <div className="text-center mt-8">
            <Loader className="animate-spin text-[#4A90E2] mx-auto" />
          </div>
        )}

        {hasMore && <div ref={loader} />}
      </div>
    </div>
  );
}

export default Accommodation;
