import { apiFetch } from "../../lib/fetcher";
import { API_PATHS } from "../../constants/paths";
import type { SignUpFormData } from "../signup/schema";

export async function signUpApi(
  userData: Omit<SignUpFormData, "confirmPassword">
) {
  return apiFetch(API_PATHS.auth.signup, {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function loginApi(payload: {
  username: string;
  password: string;
}) {
  return apiFetch(API_PATHS.auth.login, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function logoutApi() {
  return apiFetch(API_PATHS.auth.logout, {
    method: "POST",
  });
}
