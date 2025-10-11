"use client";

import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/src/constants/paths";
import { Toaster, toast } from "sonner";
import { useLoginMutation } from "../../../features/auth/use_login_mutation";
import LoginForm from "../../../features/login/components/login_form";
import type { LoginFormData } from "../../../features/login/form_schema";
import { Box } from "@mui/material";

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
