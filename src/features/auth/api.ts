import { apiRequest, apiClient } from "../../lib/api-client";
import { API_PATHS } from "../../constants/paths";
import type { SignUpFormData } from "../signup/schema";

export async function signUpApi(options: {
  Payload: Omit<SignUpFormData, "confirmPassword">;
}) {
  return apiRequest(() =>
    apiClient.post(API_PATHS.auth.signup, options.Payload)
  );
}

export async function loginApi(options: {
  username: string;
  password: string;
}) {
  return apiRequest(() =>
    apiClient.post(API_PATHS.auth.login, {
      username: options.username,
      password: options.password,
    })
  );
}

export async function logoutApi(_options?: Record<string, unknown>) {
  return apiRequest(() => apiClient.post(API_PATHS.auth.logout));
}
