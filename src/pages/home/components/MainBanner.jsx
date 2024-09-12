import React, { useState, useEffect } from "react";
import jeju1 from "../../../assets/jeju1.jpg";
import jeju2 from "../../../assets/jeju2.jpg";
import jeju3 from "../../../assets/jeju3.jpg";

const MainBanner = ({ onExplore }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [jeju1, jeju2, jeju3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentImage
              ? "opacity-100 scale-105"
              : "opacity-0 scale-100"
          }`}
        >
          <img
            src={src}
            alt={`Jeju Scenery ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
      <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="max-w-3xl space-y-8">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-[2px] bg-white"></div>
            <span className="text-white text-lg font-semibold tracking-widest">
              DISCOVER
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-none">
            The Magic of
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-lg">
              JEJU ISLAND
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 max-w-xl leading-relaxed">
            Immerse yourself in breathtaking landscapes, rich culture, and
            unforgettable adventures on Korea's premier island paradise.
          </p>
          <button
            onClick={onExplore}
            className="btn btn-lg rounded-full hover:scale-105 transition-all duration-300 
                       bg-transparent hover:bg-white/10 text-white border-2 border-white
                       hover:border-white px-8 py-3"
          >
            <span className="px-4">Explore Now</span>
          </button>
        </div>
      </div>
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 flex flex-col space-y-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-16 rounded-full transition-all duration-300 ${
              index === currentImage
                ? "bg-white scale-y-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => setCurrentImage(index)}
          ></button>
        ))}
      </div>
      <div className="absolute bottom-8 right-8 sm:right-16 text-white text-lg font-light">
        <span className="text-white font-bold text-2xl mr-2">
          0{currentImage + 1}
        </span>
        <span className="text-gray-400">/</span>
        <span className="ml-2 text-gray-400">0{images.length}</span>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={onExplore}
          className="animate-bounce bg-white/20 p-2 w-10 h-10 ring-1 ring-slate-900/5 shadow-lg rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default MainBanner;
