// Shared API types that both client and server can use
import type {
  ApiResponse,
  ApiResponseSuccess,
  ApiResponseError,
  ApiError,
} from "./api_response";

// Re-export base response types from lib
export type { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiError };

// Auth-specific response data types
export interface AuthUser {
  id: string;
  username: string;
  createdAt: string;
}

export interface SignUpResponseData {
  userId: string;
}

export interface LoginResponseData {
  userId: string;
}

export interface LogoutResponseData {
  message: string;
}

// Complete API response types (what the endpoints actually return)
export type SignUpApiResponse = ApiResponseSuccess<SignUpResponseData>;
export type LoginApiResponse = ApiResponseSuccess<LoginResponseData>;
export type LogoutApiResponse = ApiResponseSuccess<LogoutResponseData>;
