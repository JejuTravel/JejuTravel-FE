import React, { useState, useEffect } from "react";
import orchardImage1 from "../../../assets/jeju.jpg";
import orchardImage2 from "../../../assets/jeju.jpg";
import orchardImage3 from "../../../assets/jeju.jpg";

function HomeTourism() {
  const images = [
    {
      src: orchardImage1,
      alt: "제주에인 감귤밭 1",
    },
    {
      src: orchardImage2,
      alt: "제주에인 감귤밭 2",
    },
    {
      src: orchardImage3,
      alt: "제주에인 감귤밭 3",
    },
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="p-6 mt-6 flex items-start  rounded-lg shadow-md">
      <div className="flex-1 mr-4">
        <h2 className="text-red-500 text-5xl font-bold mb-2">Tourism</h2>
        <p className="text-2xl text-gray-700 leading-relaxed">
          제주의 자연과 문화를 만끽하세요!
        </p>
      </div>

      <div className="flex-1 relative overflow-hidden rounded-lg shadow-lg transition-transform duration-500 ease-in-out">
        <div className="overflow-hidden h-[500px]">
          <img
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute top-4 left-4">
            <h3 className="text-white text-4xl font-bold">
              {images[currentImageIndex].alt}
            </h3>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={prevImage}
            className="text-gray-500 bg-gray-200 hover:bg-gray-300 rounded-full p-2 mx-2 focus:outline-none"
          >
            {"<"}
          </button>
          <span className="text-gray-700 text-sm mx-2">
            {currentImageIndex + 1} / {images.length}
          </span>
          <button
            onClick={nextImage}
            className="text-gray-500 bg-gray-200 hover:bg-gray-300 rounded-full p-2 mx-2 focus:outline-none"
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeTourism;
