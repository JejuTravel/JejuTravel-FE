import React from "react";
import Header from "../../components/Header";
import MainBanner from "./components/MainBanner";
import HomeTourism from "./components/HomeTourism";
import HomeShoppingRestaurant from "./components/HomeShoppingRestaurant";
import HomeAccommodation from "./components/HomeAccommodation";

function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <MainBanner />
      <Header />
      <HomeTourism />
      <HomeShoppingRestaurant />
      <HomeAccommodation />
    </div>
  );
}

export default Home;
