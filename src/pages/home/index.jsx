import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Header from "../../components/Header";
import MainBanner from "./components/MainBanner";
import HomeTourism from "./components/HomeTourism";
import HomeShoppingRestaurant from "./components/HomeShoppingRestaurant";
import HomeAccommodation from "./components/HomeAccommodation";
import LoginModal from "../../components/LoginModal";
import {
  getTourismList,
  getShoppingList,
  getRestaurantList,
  getAccommodationList,
} from "../../apis";

function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);

    const handleScroll = () => {
      if (!isAuthenticated && window.scrollY > 200) {
        setShowLoginModal(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthenticated]);

  const fetchData = async (apiCall) => {
    if (!isAuthenticated) return null;
    try {
      const response = await apiCall(1);
      if (
        response?.data?.data?.content &&
        Array.isArray(response.data.data.content)
      ) {
        return response.data.data.content.slice(0, 5);
      } else {
        console.error("예상치 못한 API 응답 구조:", response);
        return [];
      }
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
      throw error;
    }
  };

  const { data: tourismData, isLoading: tourismLoading } = useQuery(
    "tourism",
    () => fetchData(getTourismList),
    { enabled: isAuthenticated }
  );

  const { data: shoppingData, isLoading: shoppingLoading } = useQuery(
    "shopping",
    () => fetchData(getShoppingList),
    { enabled: isAuthenticated }
  );

  const { data: restaurantData, isLoading: restaurantLoading } = useQuery(
    "restaurant",
    () => fetchData(getRestaurantList),
    { enabled: isAuthenticated }
  );

  const { data: accommodationData, isLoading: accommodationLoading } = useQuery(
    "accommodation",
    () => fetchData(getAccommodationList),
    { enabled: isAuthenticated }
  );

  const scrollToTourism = () => {
    const tourismSection = document.getElementById("home-tourism");
    if (tourismSection) {
      tourismSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Header />
      <main className="flex-grow">
        <MainBanner onExplore={scrollToTourism} />
        {isAuthenticated ? (
          <div className="bg-gradient-to-b from-[#FF4C4C]/10 via-[#FF6B6B]/5 to-[#FF4C4C]/10 py-8">
            <div className="container mx-auto px-4">
              <section id="home-tourism" className="mb-12">
                {tourismLoading ? (
                  <p>正在加载旅游数据...</p>
                ) : tourismData ? (
                  <HomeTourism tourismData={tourismData} />
                ) : (
                  <p>无法装入旅游数据。</p>
                )}
              </section>

              <section className="mb-12">
                {shoppingLoading || restaurantLoading ? (
                  <p>正在加载购物和餐厅数据...</p>
                ) : shoppingData && restaurantData ? (
                  <HomeShoppingRestaurant
                    shoppingData={shoppingData}
                    restaurantData={restaurantData}
                  />
                ) : (
                  <p>无法装入购物和餐馆数据。</p>
                )}
              </section>

              <section className="mb-12">
                {accommodationLoading ? (
                  <p>正在加载住宿数据....</p>
                ) : accommodationData ? (
                  <HomeAccommodation accommodationData={accommodationData} />
                ) : (
                  <p>无法装入住宿数据。</p>
                )}
              </section>
            </div>
          </div>
        ) : (
          <div
            style={{ height: "1000px" }}
            className="flex items-center justify-center"
          >
            <p className="text-xl text-gray-600">要查看更多信息，请登录。</p>
          </div>
        )}
        {showLoginModal && !isAuthenticated && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </main>
    </div>
  );
}

export default Home;
