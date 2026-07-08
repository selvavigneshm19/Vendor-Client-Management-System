import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("======== REQUEST ========");
    console.log("Token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Headers:", config.headers);
    console.log("=========================");

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;