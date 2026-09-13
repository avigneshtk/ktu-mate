import { convertToModelMessages, streamText, UIMessage } from "ai";
import { aviguModel, aviguSystemPrompt } from "@/lib/ai/config";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: aviguModel,
    system: aviguSystemPrompt,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}