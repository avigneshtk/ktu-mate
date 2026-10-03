import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { hashVerificationCode } from "@/lib/leetcode/verification";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      select: {
        leetcodeUsername: true,
        leetcodeVerificationHash: true,
        leetcodeVerificationExpiresAt: true,
      },
    });

    if (
      !user?.leetcodeUsername ||
      !user.leetcodeVerificationHash ||
      !user.leetcodeVerificationExpiresAt
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "No LeetCode verification is currently active.",
        },
        { status: 400 }
      );
    }

    if (new Date() > user.leetcodeVerificationExpiresAt) {
      await prisma.user.update({
        where: {
          id: session.userId,
        },
        data: {
          leetcodeVerificationHash: null,
          leetcodeVerificationExpiresAt: null,
        },
      });

      return NextResponse.json(
        {
          ok: false,
          error:
            "Your verification code has expired. Please generate a new code.",
        },
        { status: 400 }
      );
    }

    const profileQuery = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            aboutMe
          }
        }
      }
    `;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/154.0.0.0 Safari/537.36",
        Referer: `https://leetcode.com/u/${user.leetcodeUsername}/`,
      },
      body: JSON.stringify({
        query: profileQuery,
        variables: {
          username: user.leetcodeUsername,
        },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `LeetCode returned HTTP ${response.status}`
      );
    }

    const data = await response.json();

    if (data?.errors?.length) {
      console.error(
        "LeetCode verification GraphQL errors:",
        data.errors
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "Unable to read your LeetCode profile right now. Please try again.",
        },
        { status: 502 }
      );
    }

    const matchedUser = data?.data?.matchedUser;

    if (!matchedUser) {
      return NextResponse.json(
        {
          ok: false,
          error: "LeetCode username could not be found.",
        },
        { status: 404 }
      );
    }

    const aboutMe = matchedUser.profile?.aboutMe ?? "";

    const body = await request.json();
    const verificationCode = String(
      body.verificationCode || ""
    ).trim();

    if (!verificationCode) {
      return NextResponse.json(
        {
          ok: false,
          error: "Verification code is required.",
        },
        { status: 400 }
      );
    }

    const submittedHash =
      hashVerificationCode(verificationCode);

    if (submittedHash !== user.leetcodeVerificationHash) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Verification code does not match. Make sure you copied the exact code.",
        },
        { status: 400 }
      );
    }

    if (!aboutMe.includes(verificationCode)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Verification code was not found in your LeetCode About Me section. Add it there and try again.",
        },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: {
        id: session.userId,
      },
      data: {
        leetcodeVerified: true,
        leetcodeVerificationHash: null,
        leetcodeVerificationExpiresAt: null,
      },
    });

    return NextResponse.json({
      ok: true,
      verified: true,
      username: user.leetcodeUsername,
      message:
        "LeetCode account ownership verified successfully.",
    });
  } catch (error) {
    console.error(
      "Verify LeetCode ownership error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to verify your LeetCode account right now.",
      },
      { status: 502 }
    );
  }
}
