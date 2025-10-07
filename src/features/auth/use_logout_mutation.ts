import {
  useMutation,
  type UseMutationResult,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { logoutApi } from "./api";
import type { LogoutResponseData } from "../../types/api";

// Hook parameter interface using object parameters
interface UseLogoutMutationParams {
  options?: UseMutationOptions<LogoutResponseData, Error, void, unknown>;
}

export function useLogoutMutation(
  params?: UseLogoutMutationParams
): UseMutationResult<LogoutResponseData, Error, void, unknown> {
  return useMutation({
    mutationFn: async () => logoutApi(),
    ...params?.options,
  });
}
