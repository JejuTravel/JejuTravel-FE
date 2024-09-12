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
import AccommodationDetail from "./pages/accommodation/components/AccommodationDetail";
import Wifi from "./pages/wifi";
import RestaurantDetail from "./pages/restaurant/components/RestaurantDetail";
import Schedule from "./pages/schedule";

import Login from './pages/Login';
import Signup from './pages/Signup';
// import OAuthCallback from './pages/OAuthCallback'; 

function App() {
  return (
    <div className="App w-full max-w-none m-auto relative">
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
          <Route
            path="/accommodation/:contentId"
            element={<AccommodationDetail />}
          />
          <Route path="/bus" element={<Bus />} />
          <Route path="/restroom" element={<Restroom />} />
          <Route path="/wifi" element={<Wifi />} />

          <Route path="/schedule" element={<Schedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/oauth/callback" element={<OAuthCallback />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
