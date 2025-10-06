import {
  useMutation,
  type UseMutationResult,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { logoutApi } from "./api";
import type { LogoutResponse } from "./types";

// Hook parameter interface using object parameters
interface UseLogoutMutationParams {
  options?: UseMutationOptions<LogoutResponse, Error, void, unknown>;
}

export function useLogoutMutation(
  params?: UseLogoutMutationParams
): UseMutationResult<LogoutResponse, Error, void, unknown> {
  return useMutation({
    mutationFn: async () => logoutApi(),
    ...params?.options,
  });
}
