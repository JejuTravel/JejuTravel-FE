import React from "react";
import Slider from "react-slick";
import eventImage1 from '../../../assets/jeju.jpg'; 
import eventImage2 from '../../../assets/land.jpg'; 
import eventImage3 from '../../../assets/jeju.jpg'; 
import eventImage4 from '../../../assets/land.jpg'; 

const tourismSection = () => {
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
      <h2 className="text-2xl font-black text-[#00A896] mb-2">TOURISM</h2>
      <Slider {...settings}>
        <div className="p-2">
          <img src={eventImage1} alt="Event 1" className="w-full h-full object-cover" />
          <p className="mt-2 text-center">Event 1 Description</p>
        </div>
        <div className="p-2">
          <img src={eventImage2} alt="Event 2" className="w-full h-full object-cover" />
          <p className="mt-2 text-center">Event 2 Description</p>
        </div>
        <div className="p-2">
          <img src={eventImage3} alt="Event 3" className="w-full h-full object-cover" />
          <p className="mt-2 text-center">Event 3 Description</p>
        </div>
        <div className="p-2">
          <img src={eventImage4} alt="Event 4" className="w-full h-full object-cover" />
          <p className="mt-2 text-center">Event 4 Description</p>
        </div>
      </Slider>
    </section>
  );
};

export default tourismSection;
