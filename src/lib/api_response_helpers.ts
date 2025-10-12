import type {
  ApiResponse,
  ApiResponseSuccess,
  ApiResponseError,
  ApiError,
} from "../types/api_response";

// These can be used on both client and server
export function createSuccessResponse<T>(options: {
  data: T;
  message?: string;
  metadata?: Record<string, unknown>;
}): ApiResponseSuccess<T> {
  return {
    success: true,
    data: options.data,
    message: options.message,
    timestamp: new Date().toISOString(),
    metadata: options.metadata,
  };
}

export function createErrorResponse(options: {
  error: ApiError;
  message?: string;
  metadata?: Record<string, unknown>;
}): ApiResponseError {
  return {
    success: false,
    error: options.error,
    message: options.message,
    timestamp: new Date().toISOString(),
    metadata: options.metadata,
  };
}

// Client-side helper to check if response is successful
export function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is ApiResponseSuccess<T> {
  return response.success === true;
}

// Client-side helper to extract data safely
export function extractApiData<T>(response: ApiResponse<T>): T {
  if (isSuccessResponse(response)) {
    return response.data;
  }
  throw new Error(response.error?.message || "API request failed");
}
