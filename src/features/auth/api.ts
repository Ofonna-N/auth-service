import { apiRequest, apiClient } from "../../lib/api-client";
import { API_PATHS } from "../../constants/paths";
import type { SignUpFormData } from "../signup/schema";
import type { SignUpResponse, LoginResponse, LogoutResponse } from "./types";

export async function signUpApi(options: {
  Payload: Omit<SignUpFormData, "confirmPassword">;
}): Promise<SignUpResponse> {
  return apiRequest<SignUpResponse>(() =>
    apiClient.post(API_PATHS.auth.signup, options.Payload)
  );
}
export async function loginApi(options: {
  username: string;
  password: string;
}): Promise<LoginResponse> {
  return apiRequest<LoginResponse>(() =>
    apiClient.post(API_PATHS.auth.login, {
      username: options.username,
      password: options.password,
    })
  );
}
export async function logoutApi(
  options?: Record<string, unknown>
): Promise<LogoutResponse> {
  return apiRequest<LogoutResponse>(() =>
    apiClient.post(API_PATHS.auth.logout)
  );
}
