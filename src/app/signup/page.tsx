"use client";

import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import SignupForm from "../../features/signup/SignupForm";
import type { SignUpFormData } from "../../features/signup/schema";
import { signUpApi } from "../../features/auth/api";

export default function SignUpPage() {
  const router = useRouter();

  const signUpMutation = useMutation({
    mutationFn: async (userData: Omit<SignUpFormData, "confirmPassword">) =>
      signUpApi({ Payload: userData }),
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  function handleSubmit(data: SignUpFormData) {
    signUpMutation.mutate({
      username: data.username,
      password: data.password,
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <SignupForm
        onSubmit={handleSubmit}
        isSubmitting={signUpMutation.isPending}
        serverError={
          signUpMutation.error ? (signUpMutation.error as Error).message : null
        }
      />
    </Box>
  );
}
