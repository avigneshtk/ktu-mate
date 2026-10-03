"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LeetCodeConnectProps = {
  initialUsername: string | null;
};

export default function LeetCodeConnect({
  initialUsername,
}: LeetCodeConnectProps) {
  const router = useRouter();

  const [username, setUsername] = useState(initialUsername ?? "");
  const [connectedUsername, setConnectedUsername] = useState(
    initialUsername
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Please enter your LeetCode username.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/leetcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: trimmedUsername,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to connect account.");
        return;
      }

      setConnectedUsername(data.username);
      setUsername(data.username);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDisconnect() {
    const confirmed = window.confirm(
      "Disconnect your LeetCode account from KTU Mate?"
    );

    if (!confirmed) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/leetcode", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to disconnect account.");
        return;
      }

      setConnectedUsername(null);
      setUsername("");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (connectedUsername) {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-slate-900/60 p-6 backdrop-blur-md">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-400">
              Connected
            </p>

            <h3 className="mt-1 text-xl font-bold text-white">
              @{connectedUsername}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Your LeetCode username is saved to your KTU Mate profile.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDisconnect}
            disabled={loading}
            className="rounded-lg border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 disabled:opacity-50"
          >
            {loading ? "Disconnecting..." : "Disconnect"}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleConnect}
      className="rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-amber-400">
        Connect Account
      </p>

      <h3 className="mt-1 text-xl font-bold text-white">
        Connect your LeetCode username
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        Enter your public LeetCode username. KTU Mate will save it to your
        profile.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. avignesh123"
          className="flex-1 rounded-lg border border-white/10 bg-[#090d16] px-4 py-2.5 text-white outline-none placeholder:text-slate-600 focus:border-amber-500/50"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-50"
        >
          {loading ? "Connecting..." : "Connect Account"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}