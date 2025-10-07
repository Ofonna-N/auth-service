import { createSession, createUser } from "@/src/features/auth/libs/auth";
import { Prisma } from "@/src/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createSuccessResponse,
  createErrorResponse,
} from "@/src/lib/api_helpers";
import type { SignUpResponseData } from "@/src/types/api";

const signUpSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" })
    .max(100),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = signUpSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        createErrorResponse({
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details: { issues: validation.error.issues },
          },
          message: "Please check your input and try again",
        }),
        { status: 400 }
      );
    }

    const { username, password } = validation.data;

    const user = await createUser({ username, password });
    const token = await createSession({
      userId: user.id,
    });

    const userProfileUrl = new URL(
      `/api/users/${user.id}`,
      request.nextUrl.origin
    );

    // Use the shared type for response data
    const responseData: SignUpResponseData = {
      userId: user.id,
    };

    const response = NextResponse.json(
      createSuccessResponse({
        data: responseData,
        message: "User created successfully",
        metadata: { location: userProfileUrl.toString() },
      }),
      {
        status: 201,
        headers: {
          Location: userProfileUrl.toString(),
        },
      }
    );

    response.cookies.set("sessionToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Error parsing request body:", err);

    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json(
        createErrorResponse({
          error: {
            code: "DUPLICATE_USERNAME",
            message: "Username already exists",
            field: "username",
          },
          message: "Please choose a different username",
        }),
        { status: 409 }
      );
    }

    return NextResponse.json(
      createErrorResponse({
        error: {
          code: "INTERNAL_ERROR",
          message: "Internal server error",
        },
        message: "An unexpected error occurred",
      }),
      { status: 500 }
    );
  }
}
