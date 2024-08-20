import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import jejuImage from "../../../assets/jeju.jpg";

function HomeTourism() {
  const images = [
    {
      src: jejuImage,
      alt: "Jeju Island",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
    <section className="container mx-auto py-16 px-4">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-[#FF4C4C]">
            Discover Jeju
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Experience the breathtaking nature and rich culture of Jeju Island.
            <br />A new adventure awaits you at every corner.
          </p>
          <Link to="/tourism" className="inline-block">
            <button className="px-8 py-3 bg-[#FF4C4C] hover:bg-[#FF6B6B] text-white font-bold text-lg transition-all duration-300 ease-in-out rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF4C4C] focus:ring-opacity-50">
              Explore Jeju Tourism
            </button>
          </Link>
        </div>
        <div className="lg:w-1/2">
          <div
            className="relative w-full rounded-lg shadow-2xl overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center">
              <h3 className="text-white text-2xl font-bold">
                {images[currentImageIndex].alt}
              </h3>
              <div className="flex items-center">
                <button
                  onClick={prevImage}
                  className="btn btn-circle btn-sm bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-none mr-2"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-white text-sm mx-2">
                  {currentImageIndex + 1} / {images.length}
                </span>
                <button
                  onClick={nextImage}
                  className="btn btn-circle btn-sm bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-none ml-2"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeTourism;
