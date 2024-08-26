import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTourismList, searchTourism } from "../../apis";
import Header from "../../components/Header";
import TourismSection from "./components/TourismSection";
import { Search, Loader } from "lucide-react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { debounce } from "lodash";

function useTourismData() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(
    async (query = searchQuery, pageNum = page) => {
      if (loading || (!hasMore && pageNum === page)) return;
      setLoading(true);
      try {
        const response = query
          ? await searchTourism(query, pageNum)
          : await getTourismList(pageNum);
        const newEvents = response.data.data.content;
        if (newEvents.length === 0) {
          setHasMore(false);
        } else {
          setEvents((prevEvents) =>
            pageNum === 1 ? newEvents : [...prevEvents, ...newEvents]
          );
          setPage((prevPage) => (pageNum === 1 ? 2 : prevPage + 1));
        }
      } catch (err) {
        console.error("Error loading tourism data:", err);
        setError("Failed to load tourism information.");
      }
      setLoading(false);
    },
    [searchQuery, page, loading, hasMore]
  );

  const handleSearch = useCallback(() => {
    setPage(1);
    setEvents([]);
    setHasMore(true);
    loadMore(searchQuery, 1);
  }, [searchQuery, loadMore]);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  useEffect(() => {
    loadMore("", 1);
  }, []);

  return {
    events,
    searchQuery,
    loading,
    error,
    hasMore,
    loadMore,
    handleSearchChange,
    handleSearch,
  };
}

function Tourism() {
  const navigate = useNavigate();
  const {
    events,
    searchQuery,
    loading,
    error,
    hasMore,
    loadMore,
    handleSearchChange,
    handleSearch,
  } = useTourismData();

  const loader = useRef(null);

  useInfiniteScroll(loader, () => loadMore(searchQuery));

  const handleEventClick = useCallback(
    (contentId) => {
      navigate(`/tourism/${contentId}`);
    },
    [navigate]
  );

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#FF4C4C] mb-2">
            Jeju Tourism Information
          </h1>
          <p className="text-gray-600 text-lg">
            Explore the wonders of Jeju Island
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-[#FF6B6B] text-white p-4 flex items-center">
            <Search className="mr-2" />
            <h2 className="text-xl font-semibold">
              Search Tourist Attractions
            </h2>
          </div>
          <div className="p-4">
            <div className="flex items-center">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#FF4C4C] focus:border-transparent"
                placeholder="Search for attractions..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
              />
              <button
                className="p-2 bg-[#FF4C4C] text-white rounded-r-md hover:bg-[#FF6B6B] transition duration-300"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100 p-3 rounded-lg animate-fade-in">
            {error}
          </p>
        )}

        {events.length === 0 && !loading && (
          <p className="text-gray-500 text-center mb-4">
            No results found. Please try a different search term.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {events.map((event) => (
            <TourismSection
              key={event.contentId}
              event={event}
              onEventClick={handleEventClick}
            />
          ))}
        </div>

        {loading && (
          <div className="text-center mt-8">
            <Loader className="animate-spin text-[#FF4C4C] mx-auto" />
          </div>
        )}

        {hasMore && <div ref={loader} />}
      </div>
    </div>
  );
}

export default Tourism;
