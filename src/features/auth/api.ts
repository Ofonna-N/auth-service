import { apiRequest, apiClient } from "../../lib/api-client";
import { API_PATHS } from "../../constants/paths";
import type { SignUpFormData } from "../signup/schema";
import type {
  SignUpResponseData,
  LoginResponseData,
  LogoutResponseData,
} from "../../types/api";

export async function signUpApi(options: {
  Payload: Omit<SignUpFormData, "confirmPassword">;
}): Promise<SignUpResponseData> {
  return apiRequest<SignUpResponseData>(() =>
    apiClient.post(API_PATHS.auth.signup, options.Payload)
  );
}

export async function loginApi(options: {
  username: string;
  password: string;
}): Promise<LoginResponseData> {
  return apiRequest<LoginResponseData>(() =>
    apiClient.post(API_PATHS.auth.login, {
      username: options.username,
      password: options.password,
    })
  );
}

export async function logoutApi(
  options?: Record<string, unknown>
): Promise<LogoutResponseData> {
  return apiRequest<LogoutResponseData>(() =>
    apiClient.post(API_PATHS.auth.logout)
  );
}
