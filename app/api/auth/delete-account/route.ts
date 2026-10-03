import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import {
  clearSessionCookie,
  getSession,
} from "@/lib/auth/session";
import { verifyPassword } from "@/lib/auth/password";

const deleteAccountSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

const DEMO_EMAIL = "student@ktu.edu.in";

export async function DELETE(req: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "You must be logged in" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const result = deleteAccountSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          ok: false,
          error: result.error.issues[0]?.message || "Invalid password",
        },
        { status: 400 }
      );
    }

    const { password } = result.data;

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      select: {
        id: true,
        email: true,
        passwordHash: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "User account not found" },
        { status: 404 }
      );
    }

    // Protect the permanent demo account.
    if (user.email.toLowerCase() === DEMO_EMAIL) {
      return NextResponse.json(
        {
          ok: false,
          error: "The demo account cannot be deleted.",
        },
        { status: 403 }
      );
    }

    const isPasswordValid = await verifyPassword(
      password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { ok: false, error: "Password is incorrect" },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    await clearSessionCookie();

    return NextResponse.json({
      ok: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete account error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to delete account. Please try again.",
      },
      { status: 500 }
    );
  }
}