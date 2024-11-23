import { AuthResponse } from "@/features/auth/types";
import { User } from "@/features/users/types";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("nextjs_go_ums_access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refresh_token");
//       try {
//         const { data } = await api.post("/auth/refresh", {
//           refresh_token: refreshToken,
//         });
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("refresh_token", data.refresh_token);
//         return api(originalRequest);
//       } catch {
//         localStorage.removeItem("token");
//         localStorage.removeItem("refresh_token");
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export const login = async (email: string, password: string) => {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get<User>("/users/me");
  return response.data;
};

export const updateCurrentUser = async (data: Partial<User>) => {
  const response = await api.patch("/users/me", data);
  return response.data;
};

export const deleteCurrentUser = async () => {
  const response = await api.delete("/users/me");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (data: Partial<User>) => {
  const response = await api.post("/users", data);
  return response.data;
};

export const updateUser = async (id: string, data: Partial<User>) => {
  const response = await api.patch(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export default api;
