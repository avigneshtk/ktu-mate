"use client";

import { useEffect, useRef, useState } from "react";

type ButtonState = "idle" | "loading" | "success" | "error";

type MotionButtonProps = {
  forceResult?: "success" | "error";
};

export default function MotionButton({
  forceResult,
}: MotionButtonProps) {
  const [state, setState] = useState<ButtonState>("idle");
  const [isDisabled, setIsDisabled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleClick() {
    if (state === "loading" || isDisabled) {
      return;
    }

    setState("loading");
    setIsDisabled(true);

    const delay = 1000 + Math.random() * 1500;

    timeoutRef.current = setTimeout(() => {
      const result =
        forceResult ?? (Math.random() < 0.2 ? "error" : "success");

      setState(result);

      timeoutRef.current = setTimeout(() => {
        setState("idle");
        setIsDisabled(false);
      }, 1400);
    }, delay);
  }

  const content = {
    idle: "Send message",
    loading: "Sending...",
    success: "Sent!",
    error: "Try again",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      aria-live="polite"
      className={`
        relative inline-flex min-w-[160px] items-center justify-center
        rounded-xl px-6 py-3 font-semibold text-white
        transition-all duration-300 ease-out
        motion-reduce:transition-none
        focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300
        disabled:cursor-not-allowed disabled:opacity-70
        ${
          state === "error"
            ? "animate-[shake_400ms_ease-in-out]"
            : state === "success"
              ? "bg-green-600"
              : "bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
        }
        ${state === "error" ? "bg-red-600" : ""}
      `}
      style={{
        animationIterationCount: state === "error" ? 1 : undefined,
      }}
    >
      <span
        className={`
          flex items-center gap-2
          transition-all duration-200 ease-out
          motion-reduce:transition-none
          ${
            state === "loading"
              ? "scale-95 opacity-0"
              : "scale-100 opacity-100"
          }
        `}
      >
        {state === "success" && <span aria-hidden="true">✓</span>}

        {state === "error" && <span aria-hidden="true">↻</span>}

        {content[state]}
      </span>

      {state === "loading" && (
        <span
          className="absolute flex items-center gap-2 transition-opacity duration-200 ease-out motion-reduce:transition-none"
          aria-hidden="true"
        >
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent motion-reduce:animate-none" />

          Sending...
        </span>
      )}

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }

          25% {
            transform: translateX(-5px);
          }

          50% {
            transform: translateX(5px);
          }

          75% {
            transform: translateX(-3px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes shake {
            0%,
            100% {
              transform: translateX(0);
            }
          }
        }
      `}</style>
    </button>
  );
}