"use client";

import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/src/constants/paths";
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
  AppBar,
  Toolbar,
} from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import { useLogoutMutation } from "@/src/features/auth/hooks/use_logout_mutation";

interface DashboardClientProps {
  user: {
    id: string;
    username: string;
  };
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Use the shared logout hook
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation({
    options: {
      onSuccess: () => {
        // Invalidate user query and redirect
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        router.push(APP_ROUTES.login);
      },
      onError: () => {
        toast.error("Logout failed. Please try again.");
      },
    },
  });

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
            <Typography variant="h5">Hello, {user.username}!</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              You have successfully logged in and are viewing a protected page.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
