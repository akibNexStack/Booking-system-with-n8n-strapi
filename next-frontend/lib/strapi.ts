import axios from "axios";

export const strapiApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  withCredentials: true,
});

strapiApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("strapi_jwt");
    if (token && !config.url?.startsWith("/auth/")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
