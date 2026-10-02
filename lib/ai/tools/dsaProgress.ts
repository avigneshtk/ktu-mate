import { z } from "zod";
import { tool } from "ai";
import { prisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/auth/session";

export const dsaProgressTool = tool({
  description:
    "Use this tool whenever the student asks about their DSA progress, including total problems, solved problems, easy/medium/hard problems, or progress percentage. This tool provides the student's current DSA statistics.",

  inputSchema: z.object({}),

  execute: async () => {
    console.log("🔥 DSA PROGRESS TOOL CALLED");
    const session = await getSession();

    if (!session) {
      return {
        totalProblems: 0,
        solvedProblems: 0,
        easy: 0,
        medium: 0,
        hard: 0,
        percentage: 0,
        error: "User is not authenticated.",
      };
    }

    const records = await prisma.dsaSubmission.findMany({
      where: { userId: session.userId },
    });

    // A reasonable total for standard KTU DSA
    const totalProblems = 60;
    const solvedProblems = records.length;
    
    const easy = records.filter(r => r.difficulty === "Easy").length;
    const medium = records.filter(r => r.difficulty === "Medium").length;
    const hard = records.filter(r => r.difficulty === "Hard").length;

    const percentage = Math.round(
      (solvedProblems / totalProblems) * 100
    );

    return {
      totalProblems,
      solvedProblems,
      easy,
      medium,
      hard,
      percentage,
    };
  },
});