"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function AviguChat() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isStreaming = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();

    if (!text || isStreaming) {
      return;
    }

    setInput("");

    await sendMessage({
      text,
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
      <div className="h-[500px] overflow-y-auto p-5">
        {messages.length === 0 && (
          <div className="flex min-h-full items-center justify-center text-center">
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                🤖
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-950">
                Hi! I&apos;m Avigu
              </h3>

              <p className="mt-2 max-w-md text-gray-600">
                Ask me about your studies, KTU exams, DSA, programming,
                or how you can improve your preparation.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="mb-1 text-xs font-semibold opacity-70">
                  {message.role === "user" ? "You" : "Avigu"}
                </p>

                <div className="whitespace-pre-wrap text-sm leading-6">
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return (
                        <span key={index}>
                          {part.text}
                        </span>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            </div>
          ))}

          {status === "submitted" && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-600">
                <span className="animate-pulse">
                  Avigu is thinking...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        {isStreaming && (
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={() => stop()}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Stop
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={isStreaming}
            placeholder="Ask Avigu something..."
            className="min-w-0 flex-1 rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 disabled:bg-gray-100"
          />

          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}