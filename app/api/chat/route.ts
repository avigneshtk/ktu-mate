import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  UIMessage,
} from "ai";
import { aviguModel, aviguSystemPrompt } from "@/lib/ai/config";
import { dsaProgressTool } from "@/lib/ai/tools/dsaProgress";

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

    if (textLength > 4000) {
      return new Response("Message too long", { status: 400 });
    }
  }

  const result = streamText({
    model: aviguModel,
    system: aviguSystemPrompt,
    messages: await convertToModelMessages(messages),

    tools: {
      dsaProgress: dsaProgressTool,
    },

    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}