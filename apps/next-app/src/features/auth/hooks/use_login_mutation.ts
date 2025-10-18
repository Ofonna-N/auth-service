import { ApiResponseError } from "@/src/types/api_response";
import { LoginResponseData } from "@/src/types/api_schemas";
import {
  useMutation,
  type UseMutationResult,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { loginApi } from "../libs/auth_api_clients";

// Base type for login mutation input
type LoginInput = {
  username: string;
  password: string;
};

// Hook parameter interface using object parameters
interface UseLoginMutationParams {
  options?: UseMutationOptions<
    LoginResponseData,
    AxiosError<ApiResponseError>,
    LoginInput,
    unknown
  >;
}

export function useLoginMutation(
  params?: UseLoginMutationParams
): UseMutationResult<
  LoginResponseData,
  AxiosError<ApiResponseError>,
  LoginInput,
  unknown
> {
  return useMutation({
    mutationFn: async (credentials: LoginInput) => loginApi(credentials),
    ...params?.options,
  });
}
