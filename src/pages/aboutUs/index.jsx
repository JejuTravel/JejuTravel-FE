import React from "react";
import Slider from "react-slick";
import Header from "../../components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AboutUs() {
  // 슬라이더 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // 커스텀 화살표 컴포넌트
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: "10px", top: "20px", zIndex: "1" }}
        onClick={onClick}
      >
        <span style={{ fontSize: "24px", color: "#000" }}></span>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: "10px", top: "20px", zIndex: "1" }}
        onClick={onClick}
      >
        <span style={{ fontSize: "24px", color: "#000" }}></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F7FA] to-[#EAF0F6]">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#2C3E50] mb-4">About Us</h1>
          <p className="text-[#4A4A4A] text-2xl">Learn more about our project and team</p>
        </div>

        <div className="mb-12">
          <div className="bg-[#2C3E50] text-white px-4 py-3 rounded-t-lg">
            Our Project
          </div>
          <div className="bg-[#ECF0F1] p-6 rounded-b-lg shadow-lg">
        <p className="text-[#4A4A4A] text-xl mb-4">
            <em>"We got the idea from Chinese friends that backend developer met during her exchange student period in China. We started thinking about creating a web service tailored for Chinese tourists in Jeju, which can be visited without a visa."</em>
            <br />
        </p>
        <p className="text-[#4A4A4A] text-lg mb-4">
            JEJU TRAVEL is a professional web service tailored for Chinese users, providing reliable information based on data from the Korea Tourism Organization and Jeju City. 
            Our goal is to offer a wide range of places and events that suit the preferences of Chinese visitors.
        </p>
        <p className="text-[#4A4A4A] text-lg mb-4">
            This project provides the following features:
        <ul className="list-disc list-inside ml-4">
            <li>Information about famous tourist attractions and landmarks in Jeju</li>
            <li>Guidance on shopping locations and local specialties</li>
            <li>Detailed reviews and information about various restaurants and cafes</li>
            <li>Search and reservation information for accommodations</li>
            <li>Bus and public transportation information</li>
            <li>Locations of public restrooms and free Wi-Fi</li>
        </ul>
        </p>
        <p className="text-[#4A4A4A] text-xl">
            This project was developed using various web technologies and was completed through the collaboration and effort of the team members.
            On the frontend, React was used to enhance user experience, while on the backend, Spring was employed to provide a stable and fast API service.
        </p>
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-[#2C3E50] text-white px-4 py-3 rounded-t-lg">
            Our Team
          </div>
          <div className="p-4 bg-[#FFFFFF] shadow-lg">
            <Slider {...sliderSettings}>
              <div className="px-2">
                <div className="bg-[#ECF0F1] p-4 rounded-lg shadow-md flex flex-col items-center">
                  <div className="bg-[#2C3E50] w-24 h-24 rounded-full mb-3 flex items-center justify-center">
                    <img src="/path/to/image1.png" alt="김현지" className="rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50]">HyunJi KIM</h3>
                  <p className="text-sm text-[#4A4A4A]">Frontend Developer</p>
                  <ul className="text-sm text-[#4A4A4A] list-disc list-inside">
                    <li>React</li>
                    <li>Javascript</li>
                    <li>UI/UX Design</li>
                  </ul>
                </div>
              </div>
              <div className="px-2">
                <div className="bg-[#ECF0F1] p-4 rounded-lg shadow-md flex flex-col items-center">
                  <div className="bg-[#2C3E50] w-24 h-24 rounded-full mb-3 flex items-center justify-center">
                    <img src="/path/to/image2.png" alt="방재경" className="rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50]">JaeKyoung BANG</h3>
                  <p className="text-sm text-[#4A4A4A]">Frontend Developer</p>
                  <ul className="text-sm text-[#4A4A4A] list-disc list-inside">
                    <li>React</li>
                    <li>Javascript</li>
                    <li>UI/UX Design</li>
                  </ul>
                </div>
              </div>
              <div className="px-2">
                <div className="bg-[#ECF0F1] p-4 rounded-lg shadow-md flex flex-col items-center">
                  <div className="bg-[#2C3E50] w-24 h-24 rounded-full mb-3 flex items-center justify-center">
                    <img src="/path/to/image2.png" alt="김민" className="rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50]">Min KIM</h3>
                  <p className="text-sm text-[#4A4A4A]">Backend Developer</p>
                  <ul className="text-sm text-[#4A4A4A] list-disc list-inside">
                    <li>Java</li>
                    <li>Springboot</li>
                    <li>MariaDB</li>
                  </ul>
                </div>
              </div>
              <div className="px-2">
                <div className="bg-[#ECF0F1] p-4 rounded-lg shadow-md flex flex-col items-center">
                  <div className="bg-[#2C3E50] w-24 h-24 rounded-full mb-3 flex items-center justify-center">
                    <img src="/path/to/image2.png" alt="김혜연" className="rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50]">Hyeyeon KIM</h3>
                  <p className="text-sm text-[#4A4A4A]">Backend Developer</p>
                  <ul className="text-sm text-[#4A4A4A] list-disc list-inside">
                  <li>Java</li>
                    <li>Springboot</li>
                    <li>MariaDB</li>
                  </ul>
                </div>
              </div>
              <div className="px-2">
                <div className="bg-[#ECF0F1] p-4 rounded-lg shadow-md flex flex-col items-center">
                  <div className="bg-[#2C3E50] w-24 h-24 rounded-full mb-3 flex items-center justify-center">
                    <img src="/path/to/image2.png" alt="방채원" className="rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50]">Chaewon BANG</h3>
                  <p className="text-sm text-[#4A4A4A]">Backend Developer</p>
                  <ul className="text-sm text-[#4A4A4A] list-disc list-inside">
                  <li>Java</li>
                    <li>Springboot</li>
                    <li>MariaDB</li>
                  </ul>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
