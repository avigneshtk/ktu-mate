"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function AviguChat() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
    regenerate,
    clearError,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),

    onError: (error) => {
      console.error("Avigu chat error:", error);
    },
  });

  const isStreaming =
    status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    console.log(
      "CHANGE EVENT:",
      event.currentTarget.value
    );

    setInput(event.currentTarget.value);
  }

  function handleInput(
    event: React.FormEvent<HTMLInputElement>
  ) {
    const value = event.currentTarget.value;

    console.log("INPUT EVENT:", value);

    setInput(value);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const text = input.trim();

    console.log("SUBMIT INPUT:", text);

    if (!text || isStreaming) {
      return;
    }

    clearError();
    setInput("");

    await sendMessage({
      text,
    });
  }

  async function handleRetry() {
    clearError();
    await regenerate();
  }

  function useExample(text: string) {
    setInput(text);
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
                Ask me about your studies, KTU exams, DSA,
                programming, or how you can improve your
                preparation.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    useExample(
                      "What's my DSA progress?"
                    )
                  }
                  className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-blue-500 hover:bg-blue-50"
                >
                  📊 Check my DSA progress
                </button>

                <button
                  type="button"
                  onClick={() =>
                    useExample(
                      "Help me prepare for my KTU exams"
                    )
                  }
                  className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-blue-500 hover:bg-blue-50"
                >
                  📚 KTU exam preparation
                </button>

                <button
                  type="button"
                  onClick={() =>
                    useExample(
                      "Give me a DSA study plan"
                    )
                  }
                  className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-blue-500 hover:bg-blue-50"
                >
                  💻 DSA study plan
                </button>
              </div>
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
                  {message.role === "user"
                    ? "You"
                    : "Avigu"}
                </p>

                <div className="text-sm leading-6">
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return (
                        <ReactMarkdown
                          key={index}
                          components={{
                            a: ({
                              children,
                              href,
                            }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold underline"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {part.text}
                        </ReactMarkdown>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            </div>
          ))}

          {error && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800">
                <p className="font-semibold">
                  Something went wrong
                </p>

                <p className="mt-1 text-red-700">
                  Avigu couldn&apos;t complete that
                  response. Please try again.
                </p>

                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={isStreaming}
                  className="mt-3 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {status === "submitted" && (
            <div className="flex justify-start">
              <div className="w-full max-w-[85%] rounded-2xl bg-gray-100 px-4 py-4">
                <div className="mb-2 h-3 w-16 animate-pulse rounded bg-gray-300" />

                <div className="h-3 w-3/4 animate-pulse rounded bg-gray-300" />

                <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-300" />
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
            onChange={handleInputChange}
            onInput={handleInput}
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