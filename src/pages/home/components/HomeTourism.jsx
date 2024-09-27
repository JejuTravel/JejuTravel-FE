import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  MapPin,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function HomeTourism({ tourismData, isLoading }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (tourismData.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === tourismData.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [tourismData]);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === tourismData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? tourismData.length - 1 : prevIndex - 1
    );
  };

  const handleImageClick = () => {
    if (tourismData[currentImageIndex]) {
      navigate(`/tourism/${tourismData[currentImageIndex].contentId}`);
    }
  };

  return (
    <section className="py-10 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="w-full lg:w-2/5 text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight text-base-content">
              探索济州的 <span className="text-[#FF4C4C]">隐藏宝石</span>
            </h2>
            <p className="text-base lg:text-lg text-base-content/80 leading-relaxed mb-6 lg:mb-10 max-w-lg mx-auto lg:mx-0">
              揭开济州岛鲜为人知的奇观。从宁静的海滩到神秘的森林，踏上探索之旅。
            </p>
            <Link to="/tourism" className="inline-block">
              <button className="btn bg-[#FF4C4C] hover:bg-[#FF6B6B] text-white btn-lg px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                <span className="text-base lg:text-lg font-semibold">
                  发现更多
                </span>
                <MapPin className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </Link>
          </div>
          <div className="w-full lg:w-3/5">
            <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              {isLoading ? (
                <div className="flex items-center justify-center h-64 lg:h-96 bg-base-300 animate-pulse">
                  <span className="loading loading-spinner loading-lg text-[#FF4C4C]"></span>
                </div>
              ) : (
                <figure
                  className="relative overflow-hidden rounded-xl cursor-pointer"
                  style={{ aspectRatio: "16/9" }}
                  onClick={handleImageClick}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                  {tourismData.map((item, index) =>
                    item.firstImage ? (
                      <img
                        key={index}
                        src={item.firstImage}
                        alt={item.title}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                          index === currentImageIndex
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                    ) : (
                      <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-base-200 transition-opacity duration-1000 ${
                          index === currentImageIndex
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <ImageIcon
                          size={64}
                          className="text-[#FF4C4C] opacity-20"
                        />
                      </div>
                    )
                  )}
                  <div className="absolute bottom-2 lg:bottom-4 left-2 lg:left-4 right-2 lg:right-4 z-20 flex justify-between items-end">
                    <h3 className="text-white text-lg lg:text-xl font-bold drop-shadow-lg max-w-[80%]">
                      {tourismData[currentImageIndex]?.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={prevImage}
                        className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all duration-300"
                      >
                        <ChevronLeft size={16} className="text-white" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all duration-300"
                      >
                        <ChevronRight size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                </figure>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeTourism;
