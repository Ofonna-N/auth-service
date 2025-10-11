import { deleteSession } from "@/src/features/auth/libs/session_manager";
import { NextRequest, NextResponse } from "next/server";
import {
  createSuccessResponse,
  createErrorResponse,
} from "@/src/lib/api_response_helpers";
import { SESSION_COOKIE } from "@/src/constants/session_cookie_key";
export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;

    if (sessionToken) {
      await deleteSession({
        token: sessionToken,
      });
    }

    const response = NextResponse.json(
      createSuccessResponse({
        data: { message: "Logged out successfully" },
        message: "Logged out successfully",
      })
    );
    response.cookies.set(SESSION_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0), // Expire the cookie immediately
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      createErrorResponse({
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred",
        },
        message: "Failed to log out",
      }),
      { status: 500 }
    );
  }
}
