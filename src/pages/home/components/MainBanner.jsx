import React from "react";
import jejuImage from "../../../assets/jeju.jpg";

function MainBanner() {
  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      <img
        src={jejuImage}
        alt="Jeju Island"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center leading-tight mb-4">
            Discover the Beauty of
            <br />
            <span className="text-[#FF4C4C]">JEJU ISLAND</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

export default MainBanner;
