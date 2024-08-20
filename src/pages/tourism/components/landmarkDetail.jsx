import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaGlobe, FaParking, FaClock } from 'react-icons/fa';

function LandmarkDetail({ landmark, onBackClick }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <button onClick={onBackClick} className="mb-4 text-blue-500 hover:text-blue-700">
        ← Back to list
      </button>
      <h2 className="text-4xl font-bold mb-4">{landmark.name}</h2>
      <img 
        src={landmark.image} 
        alt={landmark.name} 
        className="w-full h-auto rounded-lg shadow-md object-cover mb-4" 
        style={{ maxHeight: '400px' }} 
      />
      <p className="text-gray-700 mb-4">{landmark.description}</p>

      <div className="space-y-3">
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-[#FF4C4C] mr-2" />
          <span>{landmark.location}</span>
        </div>

        <div className="flex items-center">
          <FaPhoneAlt className="text-[#FF4C4C] mr-2" />
          <span>{landmark.phone}</span>
        </div>

        <div className="flex items-center">
          <FaGlobe className="text-[#FF4C4C] mr-2" />
          <a href={landmark.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            {landmark.website}
          </a>
        </div>

        <div className="flex items-center">
          <FaParking className="text-[#FF4C4C] mr-2" />
          <span>{landmark.parking ? "Parking Available" : "No Parking Available"}</span>
        </div>

        <div className="flex items-center">
          <FaClock className="text-[#FF4C4C] mr-2" />
          <span>{landmark.hours}</span>
        </div>
      </div>
    </div>
  );
}

export default LandmarkDetail;
