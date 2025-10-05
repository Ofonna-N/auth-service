"use client";

import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import SignupForm from "../../features/signup/SignupForm";
import type { SignUpFormData } from "../../features/signup/schema";

export default function SignUpPage() {
  const router = useRouter();

  const signUpMutation = useMutation({
    mutationFn: async (userData: Omit<SignUpFormData, "confirmPassword">) => {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Sign-up failed");
      }
      return res.json();
    },
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
