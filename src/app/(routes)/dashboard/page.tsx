import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/src/constants/paths";
import { getServerSession } from "@/src/features/auth/libs/server_session";
import DashboardClient from "./dashboard_client";

export default async function DashboardPage() {
  // Validate session on the server
  const user = await getServerSession();

  // Redirect to login if not authenticated
  if (!user) {
    redirect(APP_ROUTES.login);
  }

  // Pass user data to client component
  return <DashboardClient user={user} />;
}
