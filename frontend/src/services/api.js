// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // must end with /
  timeout: 20000,
});

export default api;



