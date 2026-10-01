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