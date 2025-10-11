import { validateSessionToken } from "@/src/features/auth/libs/session_manager";
import { NextRequest, NextResponse } from "next/server";
import {
  createSuccessResponse,
  createErrorResponse,
} from "@/src/lib/api_response_helpers";

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("sessionToken")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        createErrorResponse({
          error: { code: "UNAUTHENTICATED", message: "Not authenticated" },
          message: "Authentication required",
        }),
        { status: 401 }
      );
    }

    const user = await validateSessionToken(sessionToken);

    if (!user) {
      return NextResponse.json(
        createErrorResponse({
          error: { code: "INVALID_SESSION", message: "Session invalid" },
          message: "Please log in",
        }),
        { status: 401 }
      );
    }

    return NextResponse.json(
      createSuccessResponse({ data: { id: user.id, username: user.username } })
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse({
        error: { code: "INTERNAL_ERROR", message: "Internal server error" },
        message: "An unexpected error occurred",
      }),
      { status: 500 }
    );
  }
}
