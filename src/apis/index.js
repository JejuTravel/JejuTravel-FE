import axiosInstance from "../utils/axiosInstance";

// tourism
export const getTourismList = (pageNo = 1, sigunguCode) =>
  axiosInstance.get("/tourism", { params: { pageNo, sigunguCode } });

export const searchTourism = (keyword, pageNo = 1) =>
  axiosInstance.get("/tourism/search", { params: { keyword, pageNo } });

export const getTourismDetail = (contentId) =>
  axiosInstance.get(`/tourism/info/${contentId}`); // 템플릿 리터럴 사용

// shopping
export const getShoppingList = (pageNo = 1, sigunguCode) =>
  axiosInstance.get("/shopping", { params: { pageNo, sigunguCode } });

export const searchShopping = (keyword, pageNo = 1) =>
  axiosInstance.get("/shopping/search", { params: { keyword, pageNo } });

export const getShoppingDetail = (contentId) =>
  axiosInstance.get(`/shopping/info/${contentId}`); // 템플릿 리터럴 사용

// restaurant
export const getRestaurantList = (pageNo = 1, sigunguCode) =>
  axiosInstance.get("/restaurant", { params: { pageNo, sigunguCode } });

export const searchRestaurant = (keyword, pageNo = 1) =>
  axiosInstance.get("/restaurant/search", { params: { keyword, pageNo } });

export const getRestaurantDetail = (contentId) =>
  axiosInstance.get(`/restaurant/info/${contentId}`); // 템플릿 리터럴 사용

// accommodation
export const getAccommodationList = (pageNo = 1, sigunguCode, stayType) =>
  axiosInstance.get("/stay", { params: { pageNo, sigunguCode, stayType } });

export const searchAccommodation = (keyword, pageNo = 1) =>
  axiosInstance.get("/stay/search", { params: { keyword, pageNo } });

export const getAccommodationDetail = (contentId) =>
  axiosInstance.get(`/stay/info/${contentId}`); // 템플릿 리터럴 사용

// bus
export const getBusStops = (pageNo = 1) =>
  axiosInstance.get("/busStop", { params: { pageNo } });

export const searchBusStops = (stationName, pageNo = 1) =>
  axiosInstance.get("/busStop/search", { params: { stationName, pageNo } });

// toilet
export const getPublicToilets = (pageNo = 1) =>
  axiosInstance.get("/publicToilet", { params: { pageNo } });

export const searchPublicToilets = (toiletNm, pageNo = 1) =>
  axiosInstance.get("/publicToilet/search", { params: { toiletNm, pageNo } });

// wifi
export const getPublicWifi = (pageNo = 1) =>
  axiosInstance.get("/publicWifi", { params: { pageNo } });

export const searchPublicWifi = (apGroupName, pageNo = 1) =>
  axiosInstance.get("/publicWifi/search", { params: { apGroupName, pageNo } });

// 일정 목록 조회
export const getScheduleList = (from, to) =>
  axiosInstance.get("/events", { params: { from, to } });

// 일정 생성
export const createSchedule = (scheduleData, token) => {
  const params = new URLSearchParams();
  params.append(
    "event",
    JSON.stringify({
      title: scheduleData.title,
      time: {
        start_at: scheduleData.time.start_at,
        end_at: scheduleData.time.end_at,
        time_zone: scheduleData.time.time_zone,
      },
      description: scheduleData.description,
    })
  );

  return axiosInstance.post("/create/event", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`, // 토큰 추가
    },
  });
};

// 일정 삭제
export const deleteSchedule = (scheduleId, recurUpdateType = "THIS") =>
  axiosInstance.delete("/delete/event", {
    params: { event_id: scheduleId, recur_update_type: recurUpdateType },
  });

// review
export const getReviews = (contentId) =>
  axiosInstance.get(`/review/${contentId}`); // 템플릿 리터럴 사용

export const getReviewAverage = (contentId) =>
  axiosInstance.get(`/review/average/${contentId}`); // 템플릿 리터럴 사용

export const saveReview = (reviewData) => {
  console.log("Review data in API call:", reviewData);
  return axiosInstance.post("/review/save", {
    userId: reviewData.userId,
    contentId: reviewData.contentId,
    contentTypeId: reviewData.contentTypeId,
    cat3: reviewData.cat3,
    reviewContent: reviewData.reviewContent,
    reviewRating: reviewData.reviewRating,
  });
};

export const updateReview = (reviewData) =>
  axiosInstance.post("/review/update", {
    reviewId: reviewData.reviewId,
    reviewContent: reviewData.reviewContent,
    reviewRating: reviewData.reviewRating,
  });

export const deleteReview = (reviewId) =>
  axiosInstance.post(`/review/delete/${reviewId}`); // 템플릿 리터럴 사용
