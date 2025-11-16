import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_KEY } from "./constants/session_cookie_key";
import { APP_ROUTES } from "./constants/paths";

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

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const routeType = getRouteType(pathname);
  const hasSessionCookie = !!request.cookies.get(SESSION_COOKIE_KEY)?.value;

  // Handle routes that don't require authentication
  if (routeType === "public") {
    return NextResponse.next();
  }

  // Handle protected routes without session cookie - redirect to login
  if (routeType === "protected" && !hasSessionCookie) {
    return createRedirect(APP_ROUTES.login, request);
  }

  // Redirect to dashboard if user has session cookie and tries to access auth pages
  if (routeType === "auth" && hasSessionCookie) {
    return createRedirect(APP_ROUTES.dashboard, request);
  }

  // Allow access - actual session validation will happen server-side
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  runtime: "nodejs",
};
