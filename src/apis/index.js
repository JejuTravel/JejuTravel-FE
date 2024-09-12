import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded", // 기본 Content-Type을 설정
  },
  timeout: 60000,
});

// tourism
export const getTourismList = (pageNo = 1, sigunguCode) =>
  api.get("/tourism", { params: { pageNo, sigunguCode } });

export const searchTourism = (keyword, pageNo = 1) =>
  api.get("/tourism/search", { params: { keyword, pageNo } });

export const getTourismDetail = (contentId) =>
  api.get(`/tourism/info/${contentId}`);

// shopping
export const getShoppingList = (pageNo = 1, sigunguCode) =>
  api.get("/shopping", { params: { pageNo, sigunguCode } });

export const searchShopping = (keyword, pageNo = 1) =>
  api.get("/shopping/search", { params: { keyword, pageNo } });

export const getShoppingDetail = (contentId) =>
  api.get(`/shopping/info/${contentId}`);

// restaurant
export const getRestaurantList = (pageNo = 1, sigunguCode) =>
  api.get("/restaurant", { params: { pageNo, sigunguCode } });

export const searchRestaurant = (keyword, pageNo = 1) =>
  api.get("/restaurant/search", { params: { keyword, pageNo } });

export const getRestaurantDetail = (contentId) =>
  api.get(`/restaurant/info/${contentId}`);

// accommodation
export const getAccommodationList = (pageNo = 1, sigunguCode, stayType) =>
  api.get("/stay", { params: { pageNo, sigunguCode, stayType } });

export const searchAccommodation = (keyword, pageNo = 1) =>
  api.get("/stay/search", { params: { keyword, pageNo } });

export const getAccommodationDetail = (contentId) =>
  api.get(`/stay/info/${contentId}`);

// bus
export const getBusStops = (pageNo = 1) =>
  api.get("/busStop", { params: { pageNo } });

export const searchBusStops = (stationName, pageNo = 1) =>
  api.get("/busStop/search", { params: { stationName, pageNo } });

// toilet
export const getPublicToilets = (pageNo = 1) =>
  api.get("/publicToilet", { params: { pageNo } });

export const searchPublicToilets = (toiletNm, pageNo = 1) =>
  api.get("/publicToilet/search", { params: { toiletNm, pageNo } });

// wifi
export const getPublicWifi = (pageNo = 1) =>
  api.get("/publicWifi", { params: { pageNo } });

export const searchPublicWifi = (apGroupName, pageNo = 1) =>
  api.get("/publicWifi/search", { params: { apGroupName, pageNo } });

// schedule
export const getScheduleList = (from, to, token) => {
  return api.get("/events", {
    params: { from, to },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createSchedule = (scheduleData, token) => {
  const params = new URLSearchParams();
  params.append("event", JSON.stringify(scheduleData)); // 데이터를 URLSearchParams로 변환

  return api.post("/create/event", params, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded", // Content-Type 설정
    },
  });
};

export const updateSchedule = (scheduleId, scheduleData, token) => {
  const params = new URLSearchParams();
  params.append("event", JSON.stringify(scheduleData));
  params.append("event_id", scheduleId);
  params.append("recur_update_type", "THIS"); // 기본 값 설정

  return api.post("/update/event", params, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded", // Content-Type 설정
    },
  });
};

export const deleteSchedule = (scheduleId, recurUpdateType = "THIS", token) => {
  return api.delete("/delete/event", {
    params: { event_id: scheduleId, recur_update_type: recurUpdateType },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getScheduleDetail = (eventId, token) => {
  return api.get("/event", {
    params: { event_id: eventId },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default api;
