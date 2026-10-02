"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090d16] px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-500/30 bg-red-950/40 text-3xl">
          ⚠️
        </div>

        <h2 className="mt-5 text-2xl font-bold text-white">
          Something went wrong
        </h2>

        <p className="mt-3 text-slate-400">
          An unexpected error occurred. You can retry this view or return home.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-white/15 px-5 py-3 font-semibold text-slate-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
