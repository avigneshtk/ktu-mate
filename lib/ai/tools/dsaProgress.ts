import { z } from "zod";
import { tool } from "ai";

export const dsaProgressTool = tool({
  description:
    "Use this tool whenever the student asks about their DSA progress, including total problems, solved problems, easy/medium/hard problems, or progress percentage. This tool provides the student's current DSA statistics.",

  inputSchema: z.object({}),

  execute: async () => {
    console.log("🔥 DSA PROGRESS TOOL CALLED");

    const totalProblems = 60;
    const solvedProblems = 42;
    const easy = 20;
    const medium = 17;
    const hard = 5;

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