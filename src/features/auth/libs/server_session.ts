import { cookies } from "next/headers";
import { SESSION_COOKIE_KEY } from "@/src/constants/session_cookie_key";
import { validateSessionToken } from "./session_manager";

/**
 * Server-side function to get the current user from the session.
 * Use this in Server Components, Server Actions, and API Routes.
 * @returns The user object if authenticated, null otherwise.
 */
export async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_KEY)?.value;

  if (!token) {
    return null;
  }

  try {
    const user = await validateSessionToken(token);
    return user;
  } catch (error) {
    console.error("Server session validation error:", error);
    return null;
  }
}

/**
 * Server-side function to require authentication.
 * Throws an error if the user is not authenticated.
 * Use this in Server Components or Server Actions that require auth.
 * @returns The authenticated user object.
 * @throws Error if not authenticated.
 */
export async function requireServerSession() {
  const user = await getServerSession();

  if (!user) {
    throw new Error("Unauthorized - No valid session");
  }

  return user;
}
