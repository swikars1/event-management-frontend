import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 20000,
});

API.interceptors.request.use(
  function (config) {
    let value = "";
    if (typeof window !== "undefined") {
      value = localStorage.getItem("token") || "";
    }
    config.headers.Authorization = "Bearer " + value;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
