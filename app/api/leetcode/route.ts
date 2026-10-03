import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

type LeetCodeStats = {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
};

type SubmissionStat = {
  difficulty: string;
  count: number;
};

async function getLeetCodeStats(
  username: string
): Promise<LeetCodeStats | null> {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
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
      Referer: `https://leetcode.com/u/${username}/`,
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
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
    console.error("LeetCode GraphQL errors:", data.errors);
    return null;
  }

  const matchedUser = data?.data?.matchedUser;

  if (!matchedUser) {
    return null;
  }

  const submissions: SubmissionStat[] =
    matchedUser.submitStatsGlobal?.acSubmissionNum ?? [];

  const getCount = (difficulty: string) =>
    submissions.find(
      (item) => item.difficulty === difficulty
    )?.count ?? 0;

  const easy = getCount("Easy");
  const medium = getCount("Medium");
  const hard = getCount("Hard");

  const totalFromApi = getCount("All");

  const totalSolved =
    totalFromApi > 0
      ? totalFromApi
      : easy + medium + hard;

  return {
    totalSolved,
    easy,
    medium,
    hard,
  };
}

export async function GET() {
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
      },
    });

    if (!user?.leetcodeUsername) {
      return NextResponse.json({
        ok: true,
        username: null,
        stats: null,
      });
    }

    const stats = await getLeetCodeStats(
      user.leetcodeUsername
    );

    if (!stats) {
      return NextResponse.json({
        ok: true,
        username: user.leetcodeUsername,
        stats: null,
        error:
          "Unable to fetch LeetCode statistics right now.",
      });
    }

    return NextResponse.json({
      ok: true,
      username: user.leetcodeUsername,
      stats,
    });
  } catch (error) {
    console.error("Get LeetCode stats error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          "Failed to connect to LeetCode. Please try again later.",
      },
      { status: 502 }
    );
  }
}

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

    const body = await request.json();

    const username = String(
      body.username || ""
    ).trim();

    if (!username) {
      return NextResponse.json(
        {
          ok: false,
          error: "LeetCode username is required.",
        },
        { status: 400 }
      );
    }

    const stats = await getLeetCodeStats(username);

    if (!stats) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "LeetCode username not found. Please check the username and try again.",
        },
        { status: 404 }
      );
    }

    const user = await prisma.user.update({
      where: {
        id: session.userId,
      },
      data: {
        leetcodeUsername: username,
      },
      select: {
        leetcodeUsername: true,
      },
    });

    return NextResponse.json({
      ok: true,
      username: user.leetcodeUsername,
      stats,
    });
  } catch (error) {
    console.error(
      "Connect LeetCode account error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to verify the LeetCode account right now.",
      },
      { status: 502 }
    );
  }
}

export async function DELETE() {
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

    await prisma.user.update({
      where: {
        id: session.userId,
      },
      data: {
        leetcodeUsername: null,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "LeetCode account disconnected.",
    });
  } catch (error) {
    console.error(
      "Disconnect LeetCode account error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to disconnect LeetCode account.",
      },
      { status: 500 }
    );
  }
}