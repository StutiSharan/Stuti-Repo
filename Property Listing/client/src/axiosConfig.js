// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "'https://stuti-repo.onrender.com/api'", 
   withCredentials: true,// ✅ pointing to backend
});

export default instance;
