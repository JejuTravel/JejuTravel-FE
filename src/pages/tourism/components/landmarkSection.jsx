import React from "react";
import landmarkImage from '../../../assets/jeju.jpg'; 

const LandmarkSection = () => {
  return (
    <section className="p-6 mt-0">
      <h2 className="text-2xl font-black text-[#00A896] mb-2">LANDMARK</h2>
      <div className="w-full h-1/2-screen overflow-hidden">
        <img src={landmarkImage} alt="Landmark of the Month" className="w-full h-full object-cover" />
      </div>
    </section>
  );
};

export default LandmarkSection;
