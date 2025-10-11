import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_KEY } from "./constants/session_cookie_key";
import { APP_ROUTES } from "./constants/paths";
import { validateSessionToken } from "./features/auth/libs/session_manager";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProctectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  if (!isProctectedRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_KEY)?.value;
  if (!token) {
    const loginUrl = new URL(APP_ROUTES.login, request.url);
    return NextResponse.redirect(loginUrl);
  }

  const user = await validateSessionToken(token);
  if (!user) {
    const response = NextResponse.redirect(
      new URL(APP_ROUTES.login, request.url)
    );
    response.cookies.set(SESSION_COOKIE_KEY, "", { maxAge: 0 });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  runtime: "nodejs",
};
