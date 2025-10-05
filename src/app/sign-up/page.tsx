"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";

const signupFormSchema = z
  .object({
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signupFormSchema>;

export default function SignUpPage() {
  const router = useRouter();

  // 1. Set up the form with React Hook Form (remains the same)
  const signupForm = useForm<SignUpFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Set up the API mutation with TanStack Query (remains the same)
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
      // toast.success("Account created successfully!");
      router.push("/dashboard");
    },
  });

  // 3. Define the submit handler
  function onSubmit(data: SignUpFormData) {
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
        bgcolor: "grey.100",
      }}
    >
      {/* <Toaster richColors /> */}
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

            {signUpMutation.error && (
              <Alert severity="error">{signUpMutation.error.message}</Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={signUpMutation.isPending}
              sx={{ mt: 2, py: 1.5 }}
              loading={signUpMutation.isPending}
            >
              Sign Up
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
