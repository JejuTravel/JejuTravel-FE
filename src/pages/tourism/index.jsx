import React, { useState } from "react";
import Header from "../../components/Header";
import LandmarkSection from './components/landmarkSection';
import TourismSection from './components/tourismSection';
import TourismDetail from './components/tourismDetail';

function Tourism() {
  const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 이벤트 상태 관리
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 관리
  const [filteredLandmarks, setFilteredLandmarks] = useState([]); // 필터링된 랜드마크 상태 관리

  const landmarks = [
    {
      name: "Jeju Beach",
      image: "../../../assets/jeju.jpg",
      description: "Jeju Beach is famous for its stunning natural scenery and pristine waters.",
      location: "Jeju Island, South Korea",
      phone: "010-1234-5678",
      website: "https://example.com",
      parking: true,
      hours: "09:00 AM - 06:00 PM"
    },
    {
      name: "Seongsan Ilchulbong",
      image: "../../../assets/land.jpg",
      description: "Seongsan Ilchulbong is one of the most iconic spots in Jeju Island.",
      location: "Jeju Island, South Korea",
      phone: "010-2345-6789",
      website: "https://example.com",
      parking: true,
      hours: "05:00 AM - 08:00 PM"
    },
    {
      name: "Hallasan Mountain",
      image: "../../../assets/jeju.jpg",
      description: "Hallasan Mountain is the highest mountain in South Korea and offers a great hiking experience.",
      location: "Jeju Island, South Korea",
      phone: "010-3456-7890",
      website: "https://example.com",
      parking: true,
      hours: "06:00 AM - 07:00 PM"
    }
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    window.scrollTo(0, 0); // 스크롤을 맨 위로 이동
  };

  const handleBackClick = () => {
    setSelectedEvent(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    const filtered = landmarks.filter(landmark =>
      landmark.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
      landmark.description.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredLandmarks(filtered);
  };

  return (
    <div className="min-h-screen bg-[#FFFBFC]">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        {!selectedEvent ? (
          <>
            <div className="text-center mb-12">
              <div className="flex justify-center items-center mb-4">
                <input
                  type="text"
                  className="w-full md:w-2/3 p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF4C4C]"
                  placeholder="Search Jeju Tourism Information..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="p-4 bg-[#FF4C4C] text-white rounded-r-lg hover:bg-[#007965]">
                  SEARCH
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
              {searchQuery && filteredLandmarks.length > 0 ? (
                filteredLandmarks.map((landmark, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-4 p-4 mb-4 bg-gray-100 rounded-lg cursor-pointer"
                    onClick={() => handleEventClick(landmark)}
                  >
                    <img src={landmark.image} alt={landmark.name} className="h-24 w-24 object-cover rounded-lg" />
                    <div>
                      <h3 className="text-xl font-semibold text-[#FF4C4C]">{landmark.name}</h3>
                      <p className="text-gray-700">{landmark.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <LandmarkSection onLandmarkClick={handleEventClick} />
              )}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <TourismSection onEventClick={handleEventClick} />
            </div>
          </>
        ) : (
          <TourismDetail event={selectedEvent} onBackClick={handleBackClick} />
        )}
      </div>
    </div>
  );
}

export default Tourism;
