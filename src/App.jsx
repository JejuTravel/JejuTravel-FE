import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutUs from "./pages/aboutUs";
import Mypage from "./pages/Mypage";
import Logout from "./pages/Logout";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

// 사용자 인증 상태 확인 함수
const isAuthenticated = () => {
  return localStorage.getItem("accessToken") !== null;
};

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App w-full max-w-none m-auto relative">
        <BrowserRouter>
          <Routes>
            {/* 인증이 필요 없는 라우트 */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/aboutus" element={<AboutUs />} />

            {/* 인증이 필요한 라우트 */}
            <Route
              path="/tourism"
              element={
                <ProtectedRoute>
                  <Tourism />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tourism/:contentId"
              element={
                <ProtectedRoute>
                  <TourismDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shopping"
              element={
                <ProtectedRoute>
                  <Shopping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shopping/:contentId"
              element={
                <ProtectedRoute>
                  <ShoppingDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/restaurant"
              element={
                <ProtectedRoute>
                  <Restaurant />
                </ProtectedRoute>
              }
            />
            <Route
              path="/restaurant/:contentId"
              element={
                <ProtectedRoute>
                  <RestaurantDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accommodation"
              element={
                <ProtectedRoute>
                  <Accommodation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accommodation/:contentId"
              element={
                <ProtectedRoute>
                  <AccommodationDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bus"
              element={
                <ProtectedRoute>
                  <Bus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/restroom"
              element={
                <ProtectedRoute>
                  <Restroom />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wifi"
              element={
                <ProtectedRoute>
                  <Wifi />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <ProtectedRoute>
                  <Schedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mypage"
              element={
                <ProtectedRoute>
                  <Mypage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
