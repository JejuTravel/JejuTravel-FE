import React from "react";
import Header from "../../components/Header";
import MainBanner from "./components/MainBanner";

function Home() {
  return (
    <div className="relative">
      <MainBanner />
      <Header />
    </div>
  );
}

export default Home;
