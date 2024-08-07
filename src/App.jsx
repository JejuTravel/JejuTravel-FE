import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Tourism from "./pages/tourism";

function App() {
  return (
    <div className="App w-full max-w-none m-auto relative">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tourism" element={<Tourism />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
