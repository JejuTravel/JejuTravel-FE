import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

export const getBusStops = (pageNo = 1) =>
  api.get("/busStop", { params: { pageNo } });

export const searchBusStops = (stationName, pageNo = 1) =>
  api.get("/busStop/search", { params: { stationName, pageNo } });

export const getPublicToilets = (pageNo = 1) =>
  api.get("/publicToilet", { params: { pageNo } });

export const searchPublicToilets = (toiletNm, pageNo = 1) =>
  api.get("/publicToilet/search", { params: { toiletNm, pageNo } });

export const getPublicWifi = (pageNo = 1) =>
  api.get("/publicWifi", { params: { pageNo } });

export const searchPublicWifi = (apGroupName, pageNo = 1) =>
  api.get("/publicWifi/search", { params: { apGroupName, pageNo } });

export default api;
