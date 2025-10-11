"use client";

import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Link as MUILink,
  Typography,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupFormSchema,
  SignUpFormData,
} from "../constants/signup_form_schema";
import Link from "next/link";
import { APP_ROUTES } from "@/src/constants/paths";

export default function SignupForm({
  onSubmit,
  isSubmitting,
  serverError,
}: {
  onSubmit: (data: SignUpFormData) => void;
  isSubmitting?: boolean;
  serverError?: string | null;
}) {
  const signupForm = useForm<SignUpFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Card sx={{ maxWidth: 400, width: "100%", p: 2 }}>
      <CardHeader
        title="Create an Account"
        subheader="Enter your details to get started"
        sx={{ textAlign: "center" }}
      />
      <CardContent>
        <Box
          component="form"
          onSubmit={signupForm.handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Controller
            name="username"
            control={signupForm.control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Username"
                variant="outlined"
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={signupForm.control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={signupForm.control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          {serverError && <Alert severity="error">{serverError}</Alert>}

          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <MUILink component={Link} href={APP_ROUTES.login} underline="hover">
              Log in
            </MUILink>
          </Typography>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!!isSubmitting}
            sx={{ mt: 2, py: 1.5 }}
            loading={!!isSubmitting}
          >
            Sign Up
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
