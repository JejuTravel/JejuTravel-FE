import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Tourism from "./pages/tourism";
import TourismDetail from "./pages/tourism/components/TourismDetail";
import Bus from "./pages/bus";
import Shopping from "./pages/shopping";
import Restaurant from "./pages/restaurant";
import Restroom from "./pages/restroom";
import Wifi from "./pages/wifi";

function App() {
  return (
    <div className="App w-full max-w-none m-auto relative">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tourism" element={<Tourism />} />
          <Route path="/tourism/:contentId" element={<TourismDetail />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/restroom" element={<Restroom />} />
          <Route path="/wifi" element={<Wifi />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
