import axios from "axios";
import { API_PATHS } from "../../constants/paths";
import type { SignUpFormData } from "../signup/schema";

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/api" : "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access - could redirect to login
      console.warn("Unauthorized access detected");
    }
    return Promise.reject(error);
  }
);

export async function signUpApi(options: {
  Payload: Omit<SignUpFormData, "confirmPassword">;
}) {
  const response = await apiClient.post(API_PATHS.auth.signup, options.Payload);
  console.log("Sign-up response:", response);
  return response.data;
}

export async function loginApi(options: {
  username: string;
  password: string;
}) {
  const response = await apiClient.post(API_PATHS.auth.login, {
    username: options.username,
    password: options.password,
  });
  return response.data;
}

export async function logoutApi(_options?: Record<string, unknown>) {
  const response = await apiClient.post(API_PATHS.auth.logout);
  return response.status === 204 ? null : response.data;
}
