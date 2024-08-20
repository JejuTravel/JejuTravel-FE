import React from "react";
import landmarkImage1 from '../../../assets/jeju.jpg'; 
import landmarkImage2 from '../../../assets/land.jpg'; 
import landmarkImage3 from '../../../assets/jeju.jpg'; 

const LandmarkSection = ({ onLandmarkClick }) => {
  const landmark = {
    name: "Jeju Beach",
    images: [landmarkImage1, landmarkImage2, landmarkImage3],
    description: "Jeju Beach is famous for its stunning natural scenery and pristine waters.",
    location: "Jeju Island, South Korea",
    phone: "010-1234-5678",
    website: "https://example.com",
    parking: true,
    hours: "09:00 AM - 06:00 PM"
  };

  return (
    <div className="p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-black text-[#FF4C4C] mb-4">LANDMARK</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 relative">
        <div className="relative w-full h-full overflow-hidden rounded-lg group cursor-pointer" onClick={() => onLandmarkClick(landmark)}>
          <img 
            src={landmark.images[0]} 
            alt="Landmark 1" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-300"></div>
        </div>
        <div className="grid grid-rows-2 gap-1">
          <div className="relative w-full h-64 overflow-hidden rounded-lg group cursor-pointer" onClick={() => onLandmarkClick(landmark)}>
            <img 
              src={landmark.images[1]} 
              alt="Landmark 2" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-300"></div>
          </div>
          <div className="relative w-full h-64 overflow-hidden rounded-lg group cursor-pointer" onClick={() => onLandmarkClick(landmark)}>
            <img 
              src={landmark.images[2]} 
              alt="Landmark 3" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-300"></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center pointer-events-none">
          <h2 className="text-white text-2xl font-bold opacity-90">Now Trending Landmark</h2>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-[#FF4C4C]">Jeju Beach</h3>
        <p className="text-gray-700 mt-2">
          Jeju Beach is famous for its stunning natural scenery and pristine waters. It is a beloved destination for visitors seeking the perfect getaway.
        </p>
      </div>
    </div>
  );
};

export default LandmarkSection;
