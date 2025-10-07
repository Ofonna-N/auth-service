import axios from "axios";
import type { ApiResponse } from "../types/api_response";
import { extractApiData, createErrorResponse } from "./api_helpers";

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/api" : "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor using our helper functions
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized access detected");
      // Could redirect to login here
    }

    // Use our helper to create standardized error
    const standardizedError = createErrorResponse({
      error: {
        code: error.response?.status?.toString() || "NETWORK_ERROR",
        message:
          error.response?.data?.error?.message ||
          error.message ||
          "An unexpected error occurred",
        details: error.response?.data?.error?.details || {},
      },
      message: error.response?.data?.message || "Request failed",
    });

    // Attach the standardized error to the axios error
    error.response = {
      ...error.response,
      data: standardizedError,
    };

    return Promise.reject(error);
  }
);

// Simple wrapper that handles the response extraction
export async function apiRequest<T>(requestFn: () => Promise<any>): Promise<T> {
  const response = await requestFn();
  return extractApiData<T>(response.data);
}

export { apiClient };
