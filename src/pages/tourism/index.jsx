import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTourismList, searchTourism } from "../../apis";
import Header from "../../components/Header";
import TourismSection from "./components/TourismSection";
import TouristInfoSearch from "../../components/TouristInfoSearch";
import { Loader } from "lucide-react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

function Tourism() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const loader = useRef(null);

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

  const handleSearch = useCallback(
    (event) => {
      event.preventDefault();
      setPage(1);
      setEvents([]);
      setHasMore(true);
      loadMore(searchQuery, 1);
    },
    [searchQuery, loadMore]
  );

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  useEffect(() => {
    loadMore("", 1);
  }, []);

  useInfiniteScroll(loader, () => loadMore(searchQuery));

  const handleEventClick = useCallback(
    (contentId) => {
      navigate(`/tourism/${contentId}`);
    },
    [navigate]
  );

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

        <TouristInfoSearch
          title="Search Tourism"
          placeholder="Search for tourism..."
          searchTerm={searchQuery}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />

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
