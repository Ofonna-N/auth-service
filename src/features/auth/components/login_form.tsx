"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Box,
  Alert,
  Link as MUILink,
} from "@mui/material";
import Link from "next/link";
import { APP_ROUTES } from "@/src/constants/paths";
import { loginFormSchema, LoginFormData } from "../constants/login_form_schema";

export default function LoginForm({
  onSubmit,
  onDemoLogin,
  isSubmitting,
  serverError,
}: {
  onSubmit: (data: LoginFormData) => void;
  onDemoLogin: () => void;
  isSubmitting?: boolean;
  serverError?: string | null;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: "", password: "" },
  });

  return (
    <Card sx={{ maxWidth: 400, width: "100%", p: 2 }}>
      <CardHeader
        title="Welcome Back"
        subheader="Please sign in to continue"
        sx={{ textAlign: "center" }}
      />
      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                variant="outlined"
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          {serverError && <Alert severity="error">{serverError}</Alert>}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!!isSubmitting}
            loading={!!isSubmitting}
            sx={{ mt: 2, py: 1.5 }}
          >
            Log in
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={onDemoLogin}
            sx={{ mt: 2, py: 1.5 }}
            disabled={!!isSubmitting}
            loading={!!isSubmitting}
          >
            Log in as Demo User
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Don&apos;t have an account?{" "}
            <MUILink
              component={Link}
              href={APP_ROUTES.signUp}
              underline="hover"
            >
              Sign up
            </MUILink>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
