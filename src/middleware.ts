import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_KEY } from "./constants/session_cookie_key";
import { APP_ROUTES } from "./constants/paths";
import { validateSessionToken } from "./features/auth/libs/session_manager";

// Route configuration
const ROUTE_CONFIG = {
  protected: ["/dashboard"],
  public: ["/login", "/signup", "/"],
  auth: ["/login", "/signup"],
} as const;

type RouteType = "protected" | "public" | "auth";

/**
 * Determines the type of route based on the pathname
 */
function getRouteType(pathname: string): RouteType {
  if (ROUTE_CONFIG.protected.some((route) => pathname.startsWith(route))) {
    return "protected";
  }
  if (ROUTE_CONFIG.auth.some((route) => pathname.startsWith(route))) {
    return "auth";
  }
  return "public";
}

/**
 * Creates a redirect response to the specified URL
 */
function createRedirect(url: string, request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(url, request.url));
}

/**
 * Creates a redirect response with session cleanup
 */
function createRedirectWithCleanup(
  url: string,
  request: NextRequest
): NextResponse {
  const response = createRedirect(url, request);
  response.cookies.set(SESSION_COOKIE_KEY, "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return response;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const routeType = getRouteType(pathname);
  const token = request.cookies.get(SESSION_COOKIE_KEY)?.value;

  // Handle routes that don't require authentication
  if (routeType === "public") {
    return NextResponse.next();
  }

  // Handle protected routes without token
  if (routeType === "protected" && !token) {
    return createRedirect(APP_ROUTES.login, request);
  }

  // Handle cases with no token
  if (!token) {
    // For auth routes without token, allow access
    return NextResponse.next();
  }

  // Validate session token
  let user;
  try {
    user = await validateSessionToken(token);
  } catch (error) {
    console.error("Session validation error:", error);
    // Treat as invalid session
    user = null;
  }

  // Handle invalid session
  if (!user) {
    return createRedirectWithCleanup(APP_ROUTES.login, request);
  }

  // Redirect authenticated users away from auth pages
  if (routeType === "auth") {
    return createRedirect(APP_ROUTES.dashboard, request);
  }

  // Allow access to protected routes for authenticated users
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
  runtime: "nodejs",
};
