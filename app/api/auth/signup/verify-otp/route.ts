import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";

const verifySchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = verifySchema.safeParse(body);

    if (!result.success) {
      const issue = result.error.issues[0];

      return NextResponse.json(
        {
          ok: false,
          error: issue?.message || "Invalid verification data",
        },
        { status: 400 }
      );
    }

    const email = result.data.email.toLowerCase().trim();
    const otp = result.data.otp.trim();

    // Find pending signup.
    const pendingSignup = await prisma.pendingSignup.findUnique({
      where: {
        email,
      },
    });

    if (!pendingSignup) {
      return NextResponse.json(
        {
          ok: false,
          error: "No pending signup found. Please start registration again.",
        },
        { status: 404 }
      );
    }

    // Check pending signup expiry.
    if (pendingSignup.expiresAt.getTime() < Date.now()) {
      await prisma.pendingSignup.delete({
        where: {
          email,
        },
      });

      await prisma.emailVerificationCode.deleteMany({
        where: {
          email,
        },
      });

      return NextResponse.json(
        {
          ok: false,
          error: "This verification request has expired. Please request a new OTP.",
        },
        { status: 410 }
      );
    }

    // Find OTP.
    const verificationCode =
      await prisma.emailVerificationCode.findFirst({
        where: {
          email,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    if (!verificationCode) {
      return NextResponse.json(
        {
          ok: false,
          error: "Verification code not found. Please request a new OTP.",
        },
        { status: 404 }
      );
    }

    // Check OTP expiry.
    if (verificationCode.expiresAt.getTime() < Date.now()) {
      await prisma.emailVerificationCode.deleteMany({
        where: {
          email,
        },
      });

      return NextResponse.json(
        {
          ok: false,
          error: "This OTP has expired. Please request a new one.",
        },
        { status: 410 }
      );
    }

    // Maximum 5 attempts.
    if (verificationCode.attempts >= 5) {
      await prisma.emailVerificationCode.deleteMany({
        where: {
          email,
        },
      });

      return NextResponse.json(
        {
          ok: false,
          error: "Too many incorrect attempts. Please request a new OTP.",
        },
        { status: 429 }
      );
    }

    // Compare OTP hash.
    const { createHash } = await import("crypto");

    const submittedHash = createHash("sha256")
      .update(otp)
      .digest("hex");

    if (submittedHash !== verificationCode.codeHash) {
      await prisma.emailVerificationCode.update({
        where: {
          id: verificationCode.id,
        },
        data: {
          attempts: {
            increment: 1,
          },
        },
      });

      const remainingAttempts = Math.max(
        0,
        4 - verificationCode.attempts
      );

      return NextResponse.json(
        {
          ok: false,
          error: `Incorrect OTP. ${remainingAttempts} attempts remaining.`,
        },
        { status: 400 }
      );
    }

    // Final safety check before creating the account.
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          {
            profile: {
              username: pendingSignup.username,
            },
          },
        ],
      },
    });

    if (existingUser) {
      await prisma.emailVerificationCode.deleteMany({
        where: {
          email,
        },
      });

      await prisma.pendingSignup.delete({
        where: {
          email,
        },
      });

      return NextResponse.json(
        {
          ok: false,
          error:
            existingUser.email === email
              ? "An account with this email already exists."
              : "This username is already taken.",
        },
        { status: 409 }
      );
    }

    const today = new Date().toISOString().split("T")[0];

    // Create the actual account.
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash: pendingSignup.passwordHash,

        profile: {
          create: {
            fullName: pendingSignup.fullName,
            username: pendingSignup.username,
            college: pendingSignup.college,
            course: pendingSignup.course,
            semester: pendingSignup.semester,
            academicYear: "2024-2028",
            bio: "KTU Engineering Student exploring tech and algorithms.",
          },
        },

        studyStreak: {
          create: {
            currentStreak: 1,
            bestStreak: 1,
            totalDays: 1,
            lastActiveAt: new Date(),
            activityLogs: JSON.stringify([today]),
          },
        },
      },

      include: {
        profile: true,
      },
    });

    // Delete temporary verification data.
    await prisma.emailVerificationCode.deleteMany({
      where: {
        email,
      },
    });

    await prisma.pendingSignup.delete({
      where: {
        email,
      },
    });

    // Log the user in.
    const token = await createSessionToken({
      userId: newUser.id,
      email: newUser.email,
      username: newUser.profile?.username || pendingSignup.username,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      ok: true,
      message: "Email verified and account created successfully.",
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.profile?.fullName,
        username: newUser.profile?.username,
        course: newUser.profile?.course,
        semester: newUser.profile?.semester,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error during email verification",
      },
      { status: 500 }
    );
  }
}