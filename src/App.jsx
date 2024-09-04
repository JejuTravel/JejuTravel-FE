import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Tourism from "./pages/tourism";
import TourismDetail from "./pages/tourism/components/TourismDetail";
import Bus from "./pages/bus";
import Shopping from "./pages/shopping";
import ShoppingDetail from "./pages/shopping/components/ShoppingDetail";
import Restaurant from "./pages/restaurant";
import Restroom from "./pages/restroom";
import Accommodation from "./pages/accommodation";
import Wifi from "./pages/wifi";
import RestaurantDetail from "./pages/restaurant/components/RestaurantDetail";

function App() {
  return (
    <div className="App w-[1200px] m-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tourism" element={<Tourism />} />
          <Route path="/tourism/:contentId" element={<TourismDetail />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/shopping/:contentId" element={<ShoppingDetail />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/restaurant/:contentId" element={<RestaurantDetail />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/restroom" element={<Restroom />} />
          <Route path="/wifi" element={<Wifi />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
