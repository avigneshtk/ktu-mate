"use client";

import { useEffect, useState } from "react";

type LeetCodeStatsData = {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
};

export default function LeetCodeStats() {
  const [stats, setStats] = useState<LeetCodeStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadStats() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/leetcode", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      const data = await response.json();

      console.log("LeetCode stats received:", data);

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load LeetCode statistics."
        );
      }

      setStats(data.stats ?? null);

      if (!data.stats && data.error) {
        setError(data.error);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load LeetCode statistics."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">
            Account Snapshot
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Your current LeetCode problem-solving progress.
          </p>
        </div>

        <button
          type="button"
          onClick={loadStats}
          disabled={loading}
          className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/5 bg-[#090d16] p-4 text-center"
            >
              <div className="mx-auto h-3 w-20 animate-pulse rounded bg-slate-800" />

              <div className="mx-auto mt-3 h-8 w-12 animate-pulse rounded bg-slate-800" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      ) : !stats ? (
        <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.03] p-6 text-center">
          <p className="font-semibold text-white">
            No LeetCode statistics available
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Connect a valid LeetCode account to see your progress.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-white/5 bg-[#090d16] p-4 text-center">
            <p className="text-xs font-bold uppercase text-slate-400">
              Total Solved
            </p>

            <p className="mt-1 text-2xl font-black text-white">
              {stats.totalSolved}
            </p>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#090d16] p-4 text-center">
            <p className="text-xs font-bold uppercase text-emerald-500">
              Easy
            </p>

            <p className="mt-1 text-2xl font-black text-white">
              {stats.easy}
            </p>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#090d16] p-4 text-center">
            <p className="text-xs font-bold uppercase text-amber-500">
              Medium
            </p>

            <p className="mt-1 text-2xl font-black text-white">
              {stats.medium}
            </p>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#090d16] p-4 text-center">
            <p className="text-xs font-bold uppercase text-rose-500">
              Hard
            </p>

            <p className="mt-1 text-2xl font-black text-white">
              {stats.hard}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}