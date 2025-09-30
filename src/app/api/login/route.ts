import { createSession, verifyUser } from "@/src/features/auth/libs/auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const SESSION_DURATION_SECONDS = 60 * 60 * 24; // 1 day

const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          issues: validation.error.issues,
        },
        { status: 400 } // Bad Request
      );
    }

    const { username, password } = validation.data;

    const user = await verifyUser({ username, password });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 } // Unauthorized
      );
    }

    const token = await createSession({
      userId: user.id,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
      },
      { status: 200 } // OK
    );
    response.cookies.set("sessionToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
