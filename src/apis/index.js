import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1", // 백엔드 API의 베이스 URL
  headers: {
    "Content-Type": "application/x-www-form-urlencoded", // 기본 Content-Type 설정
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

// 카카오 API를 백엔드와 연동된 API로 변경

// 일정 목록 조회
export const getScheduleList = (from, to, token) => {
  return api.get("/events", {
    params: { from, to },
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 일정 생성
// apis.js
export const createSchedule = (scheduleData, token) => {
  const params = new URLSearchParams();

  // 백엔드가 기대하는 'event' 객체 구조로 페이로드를 구성
  params.append('event', JSON.stringify({
    title: scheduleData.title,
    time: {
      start_at: scheduleData.start_at,
      end_at: scheduleData.end_at,
      time_zone: 'Asia/Seoul', // 타임존을 Asia/Seoul로 설정
    },
    description: scheduleData.description
  }));

  return api.post("/create/event", params, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};


// 일정 삭제
export const deleteSchedule = (scheduleId, recurUpdateType = "THIS", token) => {
  return api.delete("/delete/event", {
    params: { event_id: scheduleId, recur_update_type: recurUpdateType },
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 일정 수정 기능을 백엔드에서 제공하지 않기 때문에 제거 또는 추가 기능 필요시 구현

export { api };