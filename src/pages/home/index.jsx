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
  const fetchData = async (apiCall) => {
    try {
      const response = await apiCall(1);
      console.log("API Response:", response); // 전체 응답 로깅

      if (
        response &&
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data.content)
      ) {
        return response.data.data.content.slice(0, 5);
      } else {
        console.error("Unexpected API response structure:", response);
        return [];
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const {
    data: tourismData,
    isLoading: tourismLoading,
    error: tourismError,
  } = useQuery("tourism", () => fetchData(getTourismList), {
    retry: 3,
    enabled: true,
  });

  const {
    data: shoppingData,
    isLoading: shoppingLoading,
    error: shoppingError,
  } = useQuery("shopping", () => fetchData(getShoppingList), {
    retry: 3,
    enabled: true,
  });

  const {
    data: restaurantData,
    isLoading: restaurantLoading,
    error: restaurantError,
  } = useQuery("restaurant", () => fetchData(getRestaurantList), {
    retry: 3,
    enabled: true,
  });

  const {
    data: accommodationData,
    isLoading: accommodationLoading,
    error: accommodationError,
  } = useQuery("accommodation", () => fetchData(getAccommodationList), {
    retry: 3,
    enabled: true,
  });

  console.log("Tourism Data:", tourismData);
  console.log("Shopping Data:", shoppingData);
  console.log("Restaurant Data:", restaurantData);
  console.log("Accommodation Data:", accommodationData);

  if (tourismError || shoppingError || restaurantError || accommodationError) {
    console.error("Data fetching error:", {
      tourismError,
      shoppingError,
      restaurantError,
      accommodationError,
    });
    return (
      <div>
        데이터를 불러오는 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.
      </div>
    );
  }

  return (
    <div className="bg-base-100">
      <Header />
      <MainBanner />
      <div className="bg-gradient-to-b from-[#FF4C4C]/10 via-[#FF6B6B]/5 to-[#FF4C4C]/10">
        {tourismLoading ? (
          <p>관광 데이터 로딩 중...</p>
        ) : tourismData ? (
          <HomeTourism tourismData={tourismData} isLoading={false} />
        ) : (
          <p>관광 데이터가 없습니다.</p>
        )}

        {shoppingLoading || restaurantLoading ? (
          <p>쇼핑 및 레스토랑 데이터 로딩 중...</p>
        ) : shoppingData && restaurantData ? (
          <HomeShoppingRestaurant
            shoppingData={shoppingData}
            restaurantData={restaurantData}
            isLoadingShopping={false}
            isLoadingRestaurant={false}
          />
        ) : (
          <p>쇼핑 및 레스토랑 데이터가 없습니다.</p>
        )}

        {accommodationLoading ? (
          <p>숙박 데이터 로딩 중...</p>
        ) : accommodationData ? (
          <HomeAccommodation
            accommodationData={accommodationData}
            isLoading={false}
          />
        ) : (
          <p>숙박 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
