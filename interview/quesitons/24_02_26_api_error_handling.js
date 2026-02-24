// 33. How would you design API error handling globally in React?

// Answer:

// Use Axios interceptor:

import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// Why?

// Centralized error logic

// No repeated try/catch everywhere

// Cleaner components