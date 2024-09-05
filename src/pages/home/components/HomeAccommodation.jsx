import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin } from "react-feather";
import jejuImage from "../../../assets/jeju.jpg";

function HomeAccommodation() {
  const accommodations = [
    {
      name: "Luxury Ocean Resort",
      image: jejuImage,
      rating: 4.8,
      location: "Seogwipo",
      type: "Resort",
    },
    {
      name: "Cozy Mountain Retreat",
      image: jejuImage,
      rating: 4.6,
      location: "Hallasan",
      type: "Cabin",
    },
    {
      name: "Beachfront Villa",
      image: jejuImage,
      rating: 4.9,
      location: "Jungmun",
      type: "Villa",
    },
  ];

  return (
    <section className="container mx-auto py-8 px-4">
      {" "}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Where to Stay in Jeju
        </h2>
        <p className="text-xl text-gray-600">
          Discover comfort and luxury in the heart of nature
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {accommodations.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>
              <div className="flex items-center mb-2">
                <Star className="text-yellow-400 mr-1" size={18} />
                <span className="text-gray-700 font-medium">{item.rating}</span>
              </div>
              <div className="flex items-center mb-2">
                <MapPin className="text-gray-500 mr-1" size={18} />
                <span className="text-gray-600">{item.location}</span>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-[#FF4C4C] text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {item.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link
          to="/accommodation"
          className="btn btn-lg bg-[#FF4C4C] hover:bg-[#FF6B6B] text-white border-none px-8 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Explore All Accommodations
        </Link>
      </div>
    </section>
  );
}

export default HomeAccommodation;
