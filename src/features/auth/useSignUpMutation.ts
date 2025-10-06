import {
  useMutation,
  type UseMutationResult,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { SignUpFormData } from "../signup/schema";
import { signUpApi } from "./api";
import type { SignUpResponseData } from "../../types/api";

// Base type for sign up mutation input
type SignUpInput = Omit<SignUpFormData, "confirmPassword">;

// Hook parameter interface using object parameters
interface UseSignUpMutationParams {
  options?: UseMutationOptions<SignUpResponseData, Error, SignUpInput, unknown>;
}

export function useSignUpMutation(
  params?: UseSignUpMutationParams
): UseMutationResult<SignUpResponseData, Error, SignUpInput, unknown> {
  return useMutation({
    mutationFn: async (userData: SignUpInput) =>
      signUpApi({ Payload: userData }),
    ...params?.options, // Spread all TanStack Query options
  });
}
