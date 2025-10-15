import { ApiResponseError } from "@/src/types/api_response";
import { LoginResponseData } from "@/src/types/api_schemas";
import {
  useMutation,
  type UseMutationResult,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { demoLoginApi } from "../libs/auth_api_clients";

// Hook parameter interface using object parameters
interface UseLoginMutationParams {
  options?: UseMutationOptions<
    LoginResponseData,
    AxiosError<ApiResponseError>,
    void
  >;
}

export function useDemoUserLoginMutation(
  params?: UseLoginMutationParams
): UseMutationResult<LoginResponseData, AxiosError<ApiResponseError>, void> {
  return useMutation({
    mutationFn: async () => demoLoginApi(),
    ...params?.options,
  });
}
