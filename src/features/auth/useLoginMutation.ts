import {
  useMutation,
  type UseMutationResult,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { loginApi } from "./api";
import type { LoginResponse } from "./types";

// Base type for login mutation input
type LoginInput = {
  username: string;
  password: string;
};

// Hook parameter interface using object parameters
interface UseLoginMutationParams {
  options?: UseMutationOptions<LoginResponse, Error, LoginInput, unknown>;
}

export function useLoginMutation(
  params?: UseLoginMutationParams
): UseMutationResult<LoginResponse, Error, LoginInput, unknown> {
  return useMutation({
    mutationFn: async (credentials: LoginInput) => loginApi(credentials),
    ...params?.options,
  });
}
