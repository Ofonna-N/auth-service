"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";

// Material-UI Components
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { FiLogOut } from "react-icons/fi"; // Using a react-icon for the logout button
import { useCurrentUserQuery } from "@/src/features/auth/use_current_user_query";
import { useLogoutMutation } from "@/src/features/auth/use_logout_mutation";

// This is a placeholder type. In a real app, you'd have a proper User type.
type User = {
  id: string;
  username: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. Fetch the current user's data using the shared hook
  const { data: user, isLoading, error } = useCurrentUserQuery({
    options: { retry: false },
  });

  // 2. Use the shared logout hook so behavior is consistent across the app
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation({
    options: {
      onSuccess: () => {
        // Invalidate user query and redirect
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        router.push("/login");
      },
      onError: () => {
        toast.error("Logout failed. Please try again.");
      },
    },
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    // This will be true if the fetchUser call fails (e.g., 401 Unauthorized)
    // We'll add middleware later to handle this redirect automatically,
    // but this is a good client-side fallback.
    router.push("/login");
    return null; // Render nothing while redirecting
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toaster richColors />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={() => logout()}
            disabled={isLoggingOut}
            startIcon={
              isLoggingOut ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <FiLogOut />
              )
            }
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Card>
          <CardHeader title="Welcome!" />
          <CardContent>
            <Typography variant="h5">
              Hello, {user?.username || "User"}!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              You have successfully logged in and are viewing a protected page.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
