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
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema, SignUpFormData } from "./schema";

export default function SignupForm(props: {
  onSubmit: (data: SignUpFormData) => void;
  isSubmitting?: boolean;
  serverError?: string | null;
}) {
  const { onSubmit, isSubmitting, serverError } = props;

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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!!isSubmitting}
            sx={{ mt: 2, py: 1.5 }}
          >
            Sign Up
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
