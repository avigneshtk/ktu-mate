import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { generateOtp, hashOtp } from "@/lib/auth/otp";
import { sendEmail } from "@/lib/email/gmail";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  college: z.string().optional().default("KTU Affiliated College"),
  course: z
    .string()
    .optional()
    .default("B.Tech Computer Science & Engineering"),
  semester: z.number().int().min(1).max(8).optional().default(3),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      const issue = result.error.issues[0];

      return NextResponse.json(
        {
          ok: false,
          error: issue?.message || "Invalid input data",
        },
        { status: 400 }
      );
    }

    const {
      email,
      password,
      fullName,
      username,
      college,
      course,
      semester,
    } = result.data;

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = username.trim();

    // Check whether an account already exists.
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedEmail },
          { profile: { username: normalizedUsername } },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === normalizedEmail) {
        return NextResponse.json(
          {
            ok: false,
            error: "An account with this email already exists",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          ok: false,
          error: "This username is already taken",
        },
        { status: 409 }
      );
    }

    // Check the most recent OTP request.
    const recentOtp = await prisma.emailVerificationCode.findFirst({
      where: {
        email: normalizedEmail,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (recentOtp) {
      const secondsSinceLastRequest =
        (Date.now() - recentOtp.createdAt.getTime()) / 1000;

      if (secondsSinceLastRequest < 60) {
        const remaining = Math.ceil(60 - secondsSinceLastRequest);

        return NextResponse.json(
          {
            ok: false,
            error: `Please wait ${remaining} seconds before requesting another OTP.`,
          },
          { status: 429 }
        );
      }
    }

    // Generate OTP.
    const otp = generateOtp();
    const codeHash = hashOtp(otp);

    // OTP expires in 10 minutes.
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Hash the password before storing the pending signup.
    const passwordHash = await hashPassword(password);

    // Remove old pending signup data and replace it.
    await prisma.pendingSignup.deleteMany({
      where: {
        email: normalizedEmail,
      },
    });

    await prisma.pendingSignup.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        fullName,
        username: normalizedUsername,
        college,
        course,
        semester,
        expiresAt,
      },
    });

    // Remove previous OTPs.
    await prisma.emailVerificationCode.deleteMany({
      where: {
        email: normalizedEmail,
      },
    });

    // Store only the hashed OTP.
    await prisma.emailVerificationCode.create({
      data: {
        email: normalizedEmail,
        codeHash,
        expiresAt,
        attempts: 0,
      },
    });

    // Send OTP email using Gmail API.
    try {
      await sendEmail({
        to: normalizedEmail,
        subject: "Your KTU Mate verification code",
        text: `KTU Mate

Your email verification code is:

${otp}

This code expires in 10 minutes.

If you did not request this code, you can safely ignore this email.

— KTU Mate`,
      });
    } catch (error) {
      console.error("Gmail OTP error:", error);

      // Clean up pending verification data if email sending fails.
      await prisma.emailVerificationCode.deleteMany({
        where: {
          email: normalizedEmail,
        },
      });

      await prisma.pendingSignup.deleteMany({
        where: {
          email: normalizedEmail,
        },
      });

      return NextResponse.json(
        {
          ok: false,
          error: "Unable to send verification email. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "OTP sent successfully. Please check your email.",
    });
  } catch (error) {
    console.error("Send OTP error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error while sending OTP",
      },
      { status: 500 }
    );
  }
}