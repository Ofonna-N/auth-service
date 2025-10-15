import { NextResponse } from "next/server";
import prisma from "@/src/services/prisma/client";
import { createUser } from "@/src/features/auth/libs/user_manager";
import { createSession } from "@/src/features/auth/libs/session_manager";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/src/lib/api_response_helpers";

const DEMO_USER_CREDENTIALS = {
  username: "demo_user",
  password: "demo_password_123",
};

export async function POST() {
  try {
    const user = await createOrQueryDemoUser();
    if (!user) {
      return NextResponse.json(
        createErrorResponse({
          error: {
            code: "USER_CREATION_FAILED",
            message: "Failed to create or retrieve demo user",
          },
          message: "An error occurred while processing your request",
        }),
        { status: 500 }
      ); // Internal Server Error
    }

    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    const token = await createSession({
      userId: user.id,
    });

    if (!token) {
      return NextResponse.json(
        createErrorResponse({
          error: {
            code: "SESSION_CREATION_FAILED",
            message: "Failed to create session for demo user",
          },
          message: "An error occurred while processing your request",
        }),
        { status: 500 }
      ); // Internal Server Error
    }

    const response = NextResponse.json(
      createSuccessResponse({
        data: { userId: user.id },
        message: "Demo user login successful",
      }),
      { status: 200 }
    );

    response.cookies.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      createErrorResponse({
        error: {
          code: "UNKNOWN_ERROR",
          message: "An unknown error occurred",
        },
        message: "An error occurred while processing your request",
      }),
      { status: 500 }
    ); // Internal Server Error
  }
}

async function createOrQueryDemoUser() {
  const user = await prisma.user.findUnique({
    where: { username: DEMO_USER_CREDENTIALS.username },
  });

  if (!user) {
    const newUser = await createUser(DEMO_USER_CREDENTIALS);
    return await prisma.user.findUnique({
      where: { id: newUser.id },
      include: { password: true },
    });
  }

  return user;
}
