"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/src/constants/paths";
import SignupForm from "../../../features/auth/components/signup_form";
import type { SignUpFormData } from "../../../features/auth/constants/signup_form_schema";
import { useSignUpMutation } from "../../../features/auth/hooks/use_sign_up_mutation";

export default function SignUpPage() {
  const router = useRouter();

  const signUpMutation = useSignUpMutation({
    options: {
      onSuccess: () => {
        router.push(APP_ROUTES.dashboard);
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
