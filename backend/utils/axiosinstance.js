import axios from "axios";
import { API_BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // Set a timeout of 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      if (error.response.status === 401) {
        //redirect to login page or show unauthorized message
        window.location.href = "/login";
        console.error("Unauthorized access - redirecting to login");
      } else if (error.response.status === 500) {
        console.error("Server error - please try again later");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timed out - please try again later");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
