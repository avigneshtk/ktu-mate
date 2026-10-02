import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  UIMessage,
} from "ai";
import { aviguModel, aviguSystemPrompt } from "@/lib/ai/config";
import { dsaProgressTool } from "@/lib/ai/tools/dsaProgress";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // Basic input protection
  if (!Array.isArray(messages)) {
    return new Response("Invalid messages", { status: 400 });
  }

  if (messages.length > 20) {
    return new Response("Too many messages", { status: 400 });
  }

  for (const message of messages) {
    const textParts = message.parts?.filter(
      (part) => part.type === "text"
    );

    const textLength = textParts?.reduce(
      (total, part) => total + part.text.length,
      0
    );

    if (textLength && textLength > 4000) {
      return new Response("Message too long", { status: 400 });
    }
  }

  // Get authenticated context
  const session = await getSession();
  let studentContext = "The user is not currently logged in. Provide general KTU academic guidance.";

  if (session) {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        profile: true,
        studyStreak: true,
        _count: {
          select: {
            dsaRecords: true,
            timetable: true,
            seriesMarks: true,
          }
        }
      }
    });

    if (user && user.profile) {
      studentContext = `Authenticated Student Context:
Name: ${user.profile.fullName}
Course: ${user.profile.course}
Semester: ${user.profile.semester}
College: ${user.profile.college}
DSA Problems Solved: ${user._count.dsaRecords}
Current Study Streak: ${user.studyStreak?.currentStreak || 0} days
Timetable Sessions Scheduled: ${user._count.timetable}`;
    }
  }

  const result = streamText({
    model: aviguModel,
    system: `${aviguSystemPrompt}\n\n${studentContext}`,
    messages: await convertToModelMessages(messages),

    tools: {
      dsaProgress: dsaProgressTool,
    },

    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}