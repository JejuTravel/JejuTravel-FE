import { useState, useEffect } from "react";
import { getReviewAverage } from "../apis";

const useItemsWithRatings = (items) => {
  const [itemsWithRatings, setItemsWithRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      setIsLoading(true);
      try {
        const itemsWithRatingsPromises = items.map(async (item) => {
          try {
            const response = await getReviewAverage(item.contentId);
            const averageRating =
              response.data.status === "success" ? response.data.data : null;
            return { ...item, averageRating };
          } catch (error) {
            console.error(
              `Error fetching review average for item ${item.contentId}:`,
              error
            );
            return { ...item, averageRating: null };
          }
        });

        const resolvedItems = await Promise.all(itemsWithRatingsPromises);
        setItemsWithRatings(resolvedItems);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setItemsWithRatings(
          items.map((item) => ({ ...item, averageRating: null }))
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (items.length > 0) {
      fetchRatings();
    } else {
      setIsLoading(false);
    }
  }, [items]);

  return { itemsWithRatings, isLoading };
};

export default useItemsWithRatings;
