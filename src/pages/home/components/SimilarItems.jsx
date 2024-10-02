import React, { useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Coffee,
  Image as ImageIcon,
  MapPin,
  Bed,
  Star,
} from "lucide-react";
import useItemsWithRatings from "../../../hooks/useItemsWithRatings";

const SkeletonLoader = () => (
  <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
    {[1, 2, 3, 4].map((item) => (
      <div
        key={item}
        className="flex-shrink-0 w-72 bg-base-200 rounded-xl overflow-hidden shadow-lg animate-pulse"
      >
        <div className="w-full h-48 bg-base-300"></div>
        <div className="p-4">
          <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-base-300 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

const SimilarItems = React.memo(({ itemsData, title, linkPrefix }) => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const items = useMemo(() => {
    if (!itemsData || !itemsData.data) {
      console.error("Invalid itemsData:", itemsData);
      return [];
    }

    const responseData = itemsData.data;
    if (!responseData.data || !Array.isArray(responseData.data)) {
      console.error("Unexpected data structure in response:", responseData);
      return [];
    }

    return responseData.data.flatMap((item) =>
      item.data && Array.isArray(item.data) ? item.data[0] : []
    );
  }, [itemsData]);

  const { itemsWithRatings, isLoading } = useItemsWithRatings(items);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      const newScrollPosition =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newScrollPosition, behavior: "smooth" });
    }
  };

  const handleItemClick = (contentId) => {
    let routePrefix = linkPrefix;
    if (linkPrefix === "stay") {
      routePrefix = "accommodation";
    }
    navigate(`/${routePrefix}/${contentId}`);
  };

  const getIcon = useMemo(
    () => (prefix) => {
      switch (prefix) {
        case "shopping":
          return <ShoppingBag size={20} className="text-[#FF4C4C]" />;
        case "restaurant":
          return <Coffee size={20} className="text-[#FF4C4C]" />;
        case "stay":
          return <Bed size={20} className="text-[#FF4C4C]" />;
        default:
          return <MapPin size={20} className="text-[#FF4C4C]" />;
      }
    },
    []
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (itemsWithRatings.length === 0) {
    return (
      <div className="text-center py-16 bg-base-200 rounded-xl">
        <p className="text-2xl font-semibold text-base-content/80">
          没有可用的推荐数据
        </p>
        <div className="flex justify-center items-center mt-4">
          <ImageIcon size={64} className="text-base-content/20" />
        </div>
        <p className="text-base-content/60 mt-2">
          请稍后再试，我们正在努力加载更多内容！
        </p>
      </div>
    );
  }

  return (
    <section className="py-8 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6">
          <span className="text-[#FF4C4C]">{title}</span>
        </h2>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
          >
            {itemsWithRatings.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group"
                onClick={() => handleItemClick(item.contentId)}
              >
                <div className="relative">
                  {item.firstImage ? (
                    <img
                      src={item.firstImage}
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 bg-base-200 flex items-center justify-center">
                      <ImageIcon
                        size={48}
                        className="text-base-content opacity-20"
                      />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                    {getIcon(linkPrefix)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-base-content truncate mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-sm text-base-content/70 mb-2">
                    <MapPin size={16} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{item.address}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {item.averageRating != null ? (
                        <>
                          <Star size={16} className="text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">
                            {Number(item.averageRating).toFixed(1)}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-base-content/50">
                          暂无评分
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-[#FF4C4C] group-hover:underline">
                      查看详情
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-md transition-all duration-200 ease-in-out"
          >
            <ChevronLeft size={24} className="text-base-content" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-md transition-all duration-200 ease-in-out"
          >
            <ChevronRight size={24} className="text-base-content" />
          </button>
        </div>
      </div>
    </section>
  );
});

export default SimilarItems;
