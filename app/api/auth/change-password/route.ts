import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/auth/session";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });

export async function POST(req: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "You must be logged in" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const result = changePasswordSchema.safeParse(body);

    if (!result.success) {
      const issue = result.error.issues[0];

      return NextResponse.json(
        {
          ok: false,
          error: issue?.message || "Invalid password data",
        },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = result.data;

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      select: {
        id: true,
        passwordHash: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "User account not found" },
        { status: 404 }
      );
    }

    const isCurrentPasswordValid = await verifyPassword(
      currentPassword,
      user.passwordHash
    );

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { ok: false, error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const isSamePassword = await verifyPassword(
      newPassword,
      user.passwordHash
    );

    if (isSamePassword) {
      return NextResponse.json(
        {
          ok: false,
          error: "New password must be different from your current password",
        },
        { status: 400 }
      );
    }

    const newPasswordHash = await hashPassword(newPassword);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash: newPasswordHash,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to change password. Please try again.",
      },
      { status: 500 }
    );
  }
}