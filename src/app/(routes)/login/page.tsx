"use client";

import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/src/constants/paths";
import { Toaster, toast } from "sonner";
import LoginForm from "../../../features/auth/components/login_form";
import type { LoginFormData } from "../../../features/auth/constants/login_form_schema";
import { Box } from "@mui/material";
import { useLoginMutation } from "@/src/features/auth/hooks/use_login_mutation";
import { useDemoUserLoginMutation } from "@/src/features/auth/hooks/use_demouser_login_mutation";

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

  const demoLoginMutation = useDemoUserLoginMutation({
    options: {
      onSuccess: () => {
        toast.success("Logged in successfully!");
        router.push(APP_ROUTES.dashboard);
      },
    },
  });

  function onSubmit(values: LoginFormData) {
    loginMutation.mutate({
      username: values.username.trim(),
      password: values.password,
    });
  }

  function onDemoLogin() {
    demoLoginMutation.mutate();
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
        onDemoLogin={onDemoLogin}
        loginStatus={loginMutation.status}
        isSubmitting={loginMutation.isPending || demoLoginMutation.isPending}
        serverError={
          loginMutation.error?.response?.data.error.message ||
          demoLoginMutation.error?.response?.data.error.message ||
          null
        }
      />
    </Box>
  );
}
