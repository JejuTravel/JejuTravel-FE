import React from "react";
import { useQuery } from "react-query";
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
  const {
    data: tourismData,
    isLoading: tourismLoading,
    error: tourismError,
  } = useQuery("tourism", () => getTourismList(1), { retry: 3 });

  const {
    data: shoppingData,
    isLoading: shoppingLoading,
    error: shoppingError,
  } = useQuery("shopping", () => getShoppingList(1), { retry: 3 });

  const {
    data: restaurantData,
    isLoading: restaurantLoading,
    error: restaurantError,
  } = useQuery("restaurant", () => getRestaurantList(1), { retry: 3 });

  const {
    data: accommodationData,
    isLoading: accommodationLoading,
    error: accommodationError,
  } = useQuery("accommodation", () => getAccommodationList(1), { retry: 3 });

  const scrollToTourism = () => {
    const tourismSection = document.getElementById("home-tourism");
    if (tourismSection) {
      tourismSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (tourismError || shoppingError || restaurantError || accommodationError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  if (
    tourismLoading ||
    shoppingLoading ||
    restaurantLoading ||
    accommodationLoading
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-base-100">
      <Header />
      <MainBanner onExplore={scrollToTourism} />
      <div className="bg-gradient-to-b from-[#FF4C4C]/10 via-[#FF6B6B]/5 to-[#FF4C4C]/10">
        <div id="home-tourism">
          <HomeTourism
            tourismData={tourismData?.data?.content?.slice(0, 5) || []}
            isLoading={tourismLoading}
          />
        </div>
        <HomeShoppingRestaurant
          shoppingData={shoppingData?.data?.content?.slice(0, 5) || []}
          restaurantData={restaurantData?.data?.content?.slice(0, 5) || []}
          isLoadingShopping={shoppingLoading}
          isLoadingRestaurant={restaurantLoading}
        />
        <HomeAccommodation
          accommodationData={
            accommodationData?.data?.content?.slice(0, 5) || []
          }
          isLoading={accommodationLoading}
        />
      </div>
    </div>
  );
}

export default Home;
