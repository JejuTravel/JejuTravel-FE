import React from "react";
import jejuImage from "../../../assets/jeju.jpg"; // 실제 이미지 경로

function MainBanner() {
  return (
    <section className="relative w-full h-[400px] overflow-hidden">
      <img
        src={jejuImage}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-5xl font-bold text-white">
        JEJU TRAVEL
      </h1>
    </section>
  );
}

export default MainBanner;
