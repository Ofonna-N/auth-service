export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string; // For validation errors
}

export type ApiResponseSuccess<T> = ApiResponse<T> & {
  success: true;
  data: T;
};

export type ApiResponseError = ApiResponse<never> & {
  success: false;
  error: ApiError;
};
