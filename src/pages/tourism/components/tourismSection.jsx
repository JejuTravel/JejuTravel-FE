import React from "react";
import Slider from "react-slick";
import eventImage1 from '../../../assets/jeju.jpg'; 
import eventImage2 from '../../../assets/land.jpg'; 
import eventImage3 from '../../../assets/jeju.jpg'; 
import eventImage4 from '../../../assets/land.jpg'; 

const TourismSection = ({ onEventClick }) => {
  const events = [
    {
      name: "Jeju Beach",
      image: eventImage1,
      description: "Beautiful beach in Jeju Island.",
      location: "Jeju Island, South Korea",
      phone: "010-1234-5678",
      website: "https://example.com",
      parking: true,
      hours: "09:00 AM - 06:00 PM"
    },
    {
      name: "Event 2",
      image: eventImage2,
      description: "Event 2 Description",
      location: "Location 2",
      phone: "010-9876-5432",
      website: "https://event2.com",
      parking: false,
      hours: "10:00 AM - 08:00 PM"
    },
    {
      name: "Event 3",
      image: eventImage3,
      description: "Event 3 Description",
      location: "Location 3",
      phone: "010-1122-3344",
      website: "https://event3.com",
      parking: true,
      hours: "08:00 AM - 05:00 PM"
    },
    {
      name: "Event 4",
      image: eventImage4,
      description: "Event 4 Description",
      location: "Location 4",
      phone: "010-5566-7788",
      website: "https://event4.com",
      parking: false,
      hours: "07:00 AM - 03:00 PM"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className="p-6 mt-0">
      <h2 className="text-3xl font-bold text-[#FF4C4C] mb-4">TOURISM</h2>
      <Slider {...settings}>
        {events.map((event, index) => (
          <div 
            key={index} 
            className="p-2 cursor-pointer" 
            onClick={() => onEventClick(event)} // 클릭 이벤트 추가
          >
            <div className="relative w-full h-64 overflow-hidden rounded-lg">
              <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-2 text-center">{event.description}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default TourismSection;
