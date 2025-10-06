"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import SignupForm from "../../../features/signup/SignupForm";
import type { SignUpFormData } from "../../../features/signup/schema";
import { useSignUpMutation } from "../../../features/auth/useSignUpMutation";

export default function SignUpPage() {
  const router = useRouter();

  const signUpMutation = useSignUpMutation({
    options: {
      onSuccess: () => {
        router.push("/dashboard");
      },
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
