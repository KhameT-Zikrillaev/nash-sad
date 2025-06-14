// lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://nashsad.klimat-servis.uz/', // Замени на свой URL
  withCredentials: false, // если ты используешь куки для авторизации
});

export default api;
