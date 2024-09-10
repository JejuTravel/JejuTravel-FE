import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
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

export default api;
