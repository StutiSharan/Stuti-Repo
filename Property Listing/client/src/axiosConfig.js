// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   withCredentials: true,// ✅ pointing to backend
});

export default instance;
