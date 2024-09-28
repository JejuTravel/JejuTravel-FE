import React from "react";
import Slider from "react-slick";
import Header from "../../components/Header";
import hj from '../../assets/hj.jpg';
import jk from '../../assets/jk.jpg';
import m from '../../assets/m.png';
import hy from '../../assets/hy.jpg';
import cw from '../../assets/cw.jpg';
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
          <h1 className="text-4xl font-bold text-[#2C3E50] mb-4">关于我们</h1>
          <p className="text-[#4A4A4A] text-2xl">了解我们的项目和团队</p>
        </div>

        <div className="mb-12">
          <div className="bg-[#2C3E50] text-white px-4 py-3 rounded-t-lg">
            我们的项目
          </div>
          <div className="bg-[#ECF0F1] p-6 rounded-b-lg shadow-lg">
            <p className="text-[#4A4A4A] text-xl mb-4">
              <em>"我们从一位在中国的交换生期间认识的中国朋友那里得到了这个想法。我们开始考虑为中国游客创建一个专门定制的济州岛旅游网站，而济州岛是可以免签证访问的地方."</em>
              <br />
            </p>
            <p className="text-[#4A4A4A] text-lg mb-4">
            济州旅游 是为中国用户量身定制的专业旅游网站，提供基于韩国旅游局和济州市数据的可靠信息。我们的目标是为中国游客提供丰富的景点和活动，满足他们的需求和偏好。
            </p>
            <p className="text-[#4A4A4A] text-lg mb-4">
              本项目提供以下功能:
              <ul className="list-disc list-inside ml-4">
                <li>提供济州岛著名景点和地标的信息</li>
                <li>提供购物场所和当地特产的指南</li>
                <li>提供各种餐厅和咖啡馆的详细评价和信息</li>
                <li>搜索和预订住宿的信息</li>
                <li>公共交通工具和巴士的相关信息</li>
                <li>公共卫生间和免费 Wi-Fi 的位置</li>
              </ul>
            </p>
            <p className="text-[#4A4A4A] text-xl">
              该项目通过团队成员的合作与努力，利用各种网络技术完成。在前端使用 React 增强用户体验，而后端使用 Spring 提供稳定且快速的 API 服务。
            </p>
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-[#2C3E50] text-white px-4 py-3 rounded-t-lg">我们的团队</div>
          <div className="p-4 bg-[#FFFFFF] shadow-lg">
            <Slider {...sliderSettings}>
              <div className="px-2">
                <div className="bg-[#ECF0F1] p-4 rounded-lg shadow-md flex flex-col items-center">
                  <div className="bg-[#2C3E50] w-24 h-24 rounded-full mb-3 flex items-center justify-center">
                    <img src={hj} alt="HyunJi KIM" className="rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50]">HyunJi KIM</h3>
                  <p className="text-sm text-[#4A4A4A]">前端开发者</p>
                  <ul className="text-sm text-[#4A4A4A] list-disc list-inside">
                    <li>React</li>
                    <li>Javascript</li>
                    <li>UI/UX 设计</li>
                  </ul>
                </div>
              </div>
              <div className="px-2">
                <div className="bg-[#ECF0F1] p-4 rounded-lg shadow-md flex flex-col items-center">
                  <div className="bg-[#2C3E50] w-24 h-24 rounded-full mb-3 flex items-center justify-center">
                    <img src={jk} alt="JaeKyoung BANG" className="rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50]">JaeKyoung BANG</h3>
                  <p className="text-sm text-[#4A4A4A]">前端开发者</p>
                  <ul className="text-sm text-[#4A4A4A] list-disc list-inside">
                    <li>React</li>
                    <li>Javascript</li>
                    <li>UI/UX 设计</li>
                  </ul>
                </div>
              </div>
              <div className="px-2">
                <div className="bg-[#ECF0F1] p-4 rounded-lg shadow-md flex flex-col items-center">
                  <div className="bg-[#2C3E50] w-24 h-24 rounded-full mb-3 flex items-center justify-center">
                    <img src={m} alt="Min KIM" className="rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50]">Min KIM</h3>
                  <p className="text-sm text-[#4A4A4A]">后端开发者</p>
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
                    <img src={hy} alt="HyeYeon KIM" className="rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50]">HyeYeon KIM</h3>
                  <p className="text-sm text-[#4A4A4A]">后端开发者</p>
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
                    <img src={cw} alt="ChaeWon BANG" className="rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50]">ChaeWon BANG</h3>
                  <p className="text-sm text-[#4A4A4A]">后端开发者</p>
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
