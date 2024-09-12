import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import MainBanner from "./components/MainBanner";
import HomeTourism from "./components/HomeTourism";
import HomeShoppingRestaurant from "./components/HomeShoppingRestaurant";
import HomeAccommodation from "./components/HomeAccommodation";
import {
  getTourismList,
  getShoppingList,
  getRestaurantList,
  getAccommodationList,
} from "../../apis";

function Home() {
  const [tourismData, setTourismData] = useState([]);
  const [shoppingData, setShoppingData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [accommodationData, setAccommodationData] = useState([]);
  const [loading, setLoading] = useState({
    tourism: true,
    shopping: true,
    restaurant: true,
    accommodation: true,
  });

  useEffect(() => {
    const fetchData = async (apiCall, setData, loadingKey) => {
      try {
        const response = await apiCall(1);
        setData(response.data.data.content.slice(0, 5));
      } catch (error) {
        console.error(`Error fetching ${loadingKey} data:`, error);
      } finally {
        setLoading((prev) => ({ ...prev, [loadingKey]: false }));
      }
    };

    fetchData(getTourismList, setTourismData, "tourism");
    fetchData(getShoppingList, setShoppingData, "shopping");
    fetchData(getRestaurantList, setRestaurantData, "restaurant");
    fetchData(getAccommodationList, setAccommodationData, "accommodation");
  }, []);

  return (
    <div className="bg-base-100">
      <Header />
      <MainBanner />
      <div className="bg-gradient-to-b from-[#FF4C4C]/10 via-[#FF6B6B]/5 to-[#FF4C4C]/10">
        <HomeTourism tourismData={tourismData} isLoading={loading.tourism} />
        <HomeShoppingRestaurant
          shoppingData={shoppingData}
          restaurantData={restaurantData}
          isLoadingShopping={loading.shopping}
          isLoadingRestaurant={loading.restaurant}
        />
        <HomeAccommodation
          accommodationData={accommodationData}
          isLoading={loading.accommodation}
        />
      </div>
    </div>
  );
}

export default Home;
