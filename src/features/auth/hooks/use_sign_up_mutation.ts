import {
  useMutation,
  type UseMutationResult,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { SignUpFormData } from "../constants/signup_form_schema";
import { signUpApi } from "../libs/auth_api_clients";
import type {
  ApiResponseError,
  SignUpResponseData,
} from "../../../types/api_schemas";
import { AxiosError } from "axios";

// Base type for sign up mutation input
type SignUpInput = Omit<SignUpFormData, "confirmPassword">;

// Hook parameter interface using object parameters
interface UseSignUpMutationParams {
  options?: UseMutationOptions<
    SignUpResponseData,
    AxiosError<ApiResponseError>,
    SignUpInput,
    unknown
  >;
}

export function useSignUpMutation(
  params?: UseSignUpMutationParams
): UseMutationResult<
  SignUpResponseData,
  AxiosError<ApiResponseError>,
  SignUpInput,
  unknown
> {
  return useMutation({
    mutationFn: async (userData: SignUpInput) =>
      signUpApi({ Payload: userData }),
    ...params?.options, // Spread all TanStack Query options
  });
}
