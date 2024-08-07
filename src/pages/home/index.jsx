import React from "react";
import Header from "../../components/Header";
import MainBanner from "./components/MainBanner";
import HomeTourism from "./components/HomeTourism";

function Home() {
  return (
    <div className="relative">
      <MainBanner />
      <Header />
      <HomeTourism />
    </div>
  );
}

export default Home;
