import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Header from "../../components/Header";
import MainBanner from "./components/MainBanner";
import HomeTourism from "./components/HomeTourism";
import HomeShoppingRestaurant from "./components/HomeShoppingRestaurant";
import HomeAccommodation from "./components/HomeAccommodation";
import LoginModal from "../../components/LoginModal";
import SimilarItems from "./components/SimilarItems";
import {
  getTourismList,
  getShoppingList,
  getRestaurantList,
  getAccommodationList,
  getSimilarUsersTourism,
  getSimilarUsersShopping,
  getSimilarUsersStay,
  getSimilarUsersRestaurant,
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

  const { data: similarTourismData, isLoading: similarTourismLoading } =
    useQuery(
      "similarTourism",
      () => getSimilarUsersTourism(localStorage.getItem("userId")),
      { enabled: isAuthenticated }
    );

  const { data: similarShoppingData, isLoading: similarShoppingLoading } =
    useQuery(
      "similarShopping",
      () => getSimilarUsersShopping(localStorage.getItem("userId")),
      { enabled: isAuthenticated }
    );

  const { data: similarStayData, isLoading: similarStayLoading } = useQuery(
    "similarStay",
    () => getSimilarUsersStay(localStorage.getItem("userId")),
    { enabled: isAuthenticated }
  );

  const { data: similarRestaurantData, isLoading: similarRestaurantLoading } =
    useQuery(
      "similarRestaurant",
      () => getSimilarUsersRestaurant(localStorage.getItem("userId")),
      { enabled: isAuthenticated }
    );

  const scrollToTourism = () => {
    const tourismSection = document.getElementById("home-tourism");
    if (tourismSection) {
      tourismSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ElegantLoader = () => (
    <div className="flex justify-center items-center py-8">
      <span className="loading loading-dots loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Header />
      <main className="flex-grow">
        <MainBanner onExplore={scrollToTourism} />
        {isAuthenticated ? (
          <div className="space-y-12">
            <section id="home-tourism" className="fade-in">
              {tourismLoading ? (
                <ElegantLoader />
              ) : tourismData ? (
                <HomeTourism tourismData={tourismData} />
              ) : (
                <p className="text-center text-base-content/60">
                  无法加载旅游数据。
                </p>
              )}
            </section>

            {!similarTourismLoading && similarTourismData && (
              <section className="fade-in">
                <div className="h-px bg-base-300 my-8"></div>
                <SimilarItems
                  itemsData={similarTourismData}
                  title="为您推荐的景点"
                  linkPrefix="tourism"
                />
              </section>
            )}

            <section className="fade-in">
              {shoppingLoading || restaurantLoading ? (
                <ElegantLoader />
              ) : shoppingData && restaurantData ? (
                <HomeShoppingRestaurant
                  shoppingData={shoppingData}
                  restaurantData={restaurantData}
                />
              ) : (
                <p className="text-center text-base-content/60">
                  无法加载购物和餐馆数据。
                </p>
              )}
            </section>

            {!similarShoppingLoading && similarShoppingData && (
              <section className="fade-in">
                <div className="h-px bg-base-300 my-8"></div>
                <SimilarItems
                  itemsData={similarShoppingData}
                  title="为您推荐的购物场所"
                  linkPrefix="shopping"
                />
              </section>
            )}

            {!similarRestaurantLoading && similarRestaurantData && (
              <section className="fade-in">
                <div className="h-px bg-base-300 my-8"></div>
                <SimilarItems
                  itemsData={similarRestaurantData}
                  title="为您推荐的餐厅"
                  linkPrefix="restaurant"
                />
              </section>
            )}

            <section className="fade-in">
              {accommodationLoading ? (
                <ElegantLoader />
              ) : accommodationData ? (
                <HomeAccommodation accommodationData={accommodationData} />
              ) : (
                <p className="text-center text-base-content/60">
                  无法加载住宿数据。
                </p>
              )}
            </section>

            {!similarStayLoading && similarStayData && (
              <section className="fade-in">
                <div className="h-px bg-base-300 my-8"></div>
                <SimilarItems
                  itemsData={similarStayData}
                  title="为您推荐的住宿"
                  linkPrefix="stay"
                />
              </section>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-base-100">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">欢迎来到济州探索</h1>
              <p className="mb-8 text-base-content/70">
                登录以探索更多精彩内容，体验济州岛的魅力。
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setShowLoginModal(true)}
              >
                立即登录
              </button>
            </div>
          </div>
        )}
        {showLoginModal && !isAuthenticated && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </main>
      <footer className="footer footer-center p-4 bg-base-200 text-base-content">
        <div>
          <p>Copyright © 2024 - All right reserved by 济州探索</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
