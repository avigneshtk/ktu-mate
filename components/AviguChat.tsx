"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isStaticToolUIPart } from "ai";
import DsaProgressResult from "./DsaProgressResult";
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
    setInput(event.currentTarget.value);
  }

  function handleInput(
    event: React.FormEvent<HTMLInputElement>
  ) {
    setInput(event.currentTarget.value);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const text = input.trim();

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

  function handleExample(text: string) {
    setInput(text);
  }

  return (
    <section
      aria-label="Avigu AI chat"
      className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-xl"
    >
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/40 bg-purple-600/20 text-xl"
          aria-hidden="true"
        >
          🤖
        </div>

        <div className="flex-1">
          <p className="font-bold text-white">Avigu</p>
          <p className="text-xs text-cyan-400">
            AI Academic Companion
          </p>
        </div>

        <span className="rounded-full border border-green-500/30 bg-green-500/15 px-2.5 py-0.5 text-xs font-semibold text-green-400">
          Online
        </span>
      </div>

      {/* Chat messages */}
      <div
        className="h-[500px] overflow-y-auto p-5"
        aria-label="Chat messages"
      >
        {messages.length === 0 && (
          <div className="flex min-h-full items-center justify-center text-center">
            <div>
              {/* Decorative icon */}
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-purple-500/30 bg-purple-600/20 text-3xl"
                aria-hidden="true"
              >
                🤖
              </div>

              <h2 className="mt-4 text-xl font-bold text-white">
                Hi! I&apos;m Avigu
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                Ask me about your studies, KTU exams, DSA, programming, or
                how you can improve your preparation.
              </p>

              {/* Example prompts */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleExample("What's my DSA progress?")
                  }
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  📊 Check my DSA progress
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleExample("Help me prepare for my KTU exams")
                  }
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  📚 KTU exam preparation
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleExample("Give me a DSA study plan")
                  }
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
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
                aria-live={
                  message.role === "assistant"
                    ? "polite"
                    : undefined
                }
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-purple-600 text-white"
                    : "border border-white/10 bg-slate-900/90 text-slate-200"
                }`}
              >
                <p className="mb-1 text-xs font-semibold opacity-70">
                  {message.role === "user" ? "You" : "Avigu"}
                </p>

                <div className="text-sm leading-6">
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return (
                        <ReactMarkdown
                          key={index}
                          components={{
                            a: ({ children, href }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-cyan-400 underline hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
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

                    if (isStaticToolUIPart(part)) {
                      const toolName = part.type.replace("tool-", "");

                      if (toolName !== "dsaProgress") {
                        return null;
                      }

                      if (
                        part.state === "output-available" &&
                        part.output
                      ) {
                        const r =
                          part.output as Record<string, number>;

                        return (
                          <div
                            key={part.toolCallId}
                            className="mt-3"
                          >
                            <DsaProgressResult
                              totalProblems={r.totalProblems}
                              solvedProblems={r.solvedProblems}
                              easy={r.easy}
                              medium={r.medium}
                              hard={r.hard}
                              percentage={r.percentage}
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={part.toolCallId}
                            className="mt-3 animate-pulse text-xs text-purple-300"
                          >
                            Fetching your DSA progress...
                          </div>
                        );
                      }
                    }

                    return null;
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Error state */}
          {error && (
            <div className="flex justify-start">
              <div
                role="alert"
                className="max-w-[85%] rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-4 text-sm text-red-300"
              >
                <p className="font-semibold">
                  Something went wrong
                </p>

                <p className="mt-1 text-red-400">
                  Avigu couldn&apos;t complete that response. Please
                  try again.
                </p>

                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={isStreaming}
                  className="mt-3 rounded-lg border border-red-500/40 bg-red-600/20 px-4 py-2 font-semibold text-red-300 transition hover:bg-red-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {/* Loading state */}
          {status === "submitted" && (
            <div
              className="flex justify-start"
              aria-label="Avigu is preparing a response"
            >
              <div className="w-full max-w-[85%] rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-4">
                <div className="mb-2 h-3 w-16 rounded bg-slate-700 motion-safe:animate-pulse" />

                <div className="h-3 w-3/4 rounded bg-slate-700" />

                <div className="mt-2 h-3 w-1/2 rounded bg-slate-700" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat controls */}
      <div className="border-t border-white/10 p-4">
        {isStreaming && (
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={() => stop()}
              className="rounded-lg border border-red-500/40 bg-red-950/30 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-950/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Stop
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <label
            htmlFor="avigu-chat-input"
            className="sr-only"
          >
            Ask Avigu a question
          </label>

          <input
            id="avigu-chat-input"
            type="text"
            value={input}
            onChange={handleInputChange}
            onInput={handleInput}
            disabled={isStreaming}
            placeholder="Ask Avigu something..."
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-purple-600/20 transition hover:from-purple-500 hover:to-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}