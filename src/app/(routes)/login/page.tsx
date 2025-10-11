"use client";

import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/src/constants/paths";
import { Toaster, toast } from "sonner";
import LoginForm from "../../../features/auth/components/login_form";
import type { LoginFormData } from "../../../features/auth/constants/login_form_schema";
import { Box } from "@mui/material";
import { useLoginMutation } from "@/src/features/auth/hooks/use_login_mutation";

export default function LoginPage() {
  const router = useRouter();

  const loginMutation = useLoginMutation({
    options: {
      onSuccess: () => {
        toast.success("Logged in successfully!");
        router.push(APP_ROUTES.dashboard);
      },
    },
  });

  function onSubmit(values: LoginFormData) {
    loginMutation.mutate(values);
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
      <Toaster richColors />
      <LoginForm
        onSubmit={onSubmit}
        isSubmitting={loginMutation.isPending}
        serverError={
          loginMutation.error
            ? loginMutation.error.response?.data.message
            : null
        }
      />
    </Box>
  );
}
