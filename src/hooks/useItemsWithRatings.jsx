import { useState, useEffect, useRef, useCallback } from "react";
import { getReviewAverage } from "../apis";

const useItemsWithRatings = (items) => {
  const [itemsWithRatings, setItemsWithRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef(new Map());

  const fetchRating = useCallback(async (item) => {
    if (cache.current.has(item.contentId)) {
      return { ...item, averageRating: cache.current.get(item.contentId) };
    }

    try {
      const response = await getReviewAverage(item.contentId);
      const averageRating =
        response.data.status === "success" ? response.data.data : null;
      cache.current.set(item.contentId, averageRating);
      return { ...item, averageRating };
    } catch (error) {
      console.error(
        `Error fetching review average for item ${item.contentId}:`,
        error
      );
      return { ...item, averageRating: null };
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchRatings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const itemsWithRatingsPromises = items.map((item) => fetchRating(item));
        const resolvedItems = await Promise.all(itemsWithRatingsPromises);

        if (!abortController.signal.aborted) {
          setItemsWithRatings(resolvedItems);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Error fetching ratings:", error);
          setError(error);
          setItemsWithRatings(
            items.map((item) => ({ ...item, averageRating: null }))
          );
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    if (items.length > 0) {
      fetchRatings();
    } else {
      setIsLoading(false);
      setItemsWithRatings([]);
    }

    return () => {
      abortController.abort();
    };
  }, [items, fetchRating]);

  return { itemsWithRatings, isLoading, error };
};

export default useItemsWithRatings;
