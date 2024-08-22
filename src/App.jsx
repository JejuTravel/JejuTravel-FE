import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Tourism from "./pages/tourism";
import Bus from "./pages/bus";
import Shopping from "./pages/shopping";
import Restaurant from "./pages/restaurant";
import Restroom from "./pages/restroom";
import Accommodation from './pages/accommodation';  // 올바른 경로 확인

function App() {
  return (
    <div className="App w-full max-w-none m-auto relative">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tourism" element={<Tourism />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/restroom" element={<Restroom />} />
          <Route path="/accommodation" element={<Accommodation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
