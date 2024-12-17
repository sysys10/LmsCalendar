import axios from "axios";

const BASEURL = "http://localhost:3030/api";

const axiosInstance = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
