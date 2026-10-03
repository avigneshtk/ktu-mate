"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LeetCodeConnectProps = {
  initialUsername: string | null;
  initialVerified?: boolean;
};

export default function LeetCodeConnect({
  initialUsername,
  initialVerified = false,
}: LeetCodeConnectProps) {
  const router = useRouter();

  const [username, setUsername] = useState(initialUsername ?? "");
  const [connectedUsername, setConnectedUsername] = useState(
    initialUsername
  );
  const [verified, setVerified] = useState(initialVerified);
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(verificationCode);

      setCopied(true);
      setError("");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Could not copy the code. Please copy it manually.");
    }
  }

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Please enter your LeetCode username.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

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
        setError(data.error || "Failed to start verification.");
        return;
      }

      setConnectedUsername(data.username);
      setUsername(data.username);
      setVerified(false);
      setVerificationCode(data.verificationCode || "");
      setCopied(false);

      setMessage(
        "Verification code generated. Add it to your LeetCode About Me section."
      );

      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify() {
    if (!verificationCode) {
      setError("No verification code is available.");
      return;
    }

    setVerifying(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/leetcode/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Verification failed.");
        return;
      }

      setVerified(true);
      setVerificationCode("");
      setCopied(false);

      setMessage(
        "LeetCode account ownership verified successfully."
      );

      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setVerifying(false);
    }
  }

  async function handleDisconnect() {
    const confirmed = window.confirm(
      "Disconnect your LeetCode account from KTU Mate?"
    );

    if (!confirmed) return;

    setLoading(true);
    setError("");
    setMessage("");

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
      setVerified(false);
      setVerificationCode("");
      setCopied(false);

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
            <div className="flex items-center gap-2">
              <p
                className={`text-xs font-bold uppercase tracking-wide ${
                  verified
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              >
                {verified ? "Verified" : "Verification Required"}
              </p>

              {verified && (
                <span className="text-emerald-400">OK</span>
              )}
            </div>

            <h3 className="mt-1 text-xl font-bold text-white">
              @{connectedUsername}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {verified
                ? "You have verified ownership of this LeetCode account."
                : "Your username is connected, but ownership has not been verified yet."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDisconnect}
            disabled={loading || verifying}
            className="rounded-lg border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 disabled:opacity-50"
          >
            {loading ? "Disconnecting..." : "Disconnect"}
          </button>
        </div>

        {!verified && verificationCode && (
          <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
            <p className="text-sm font-semibold text-white">
              Step 1 - Add this code to your LeetCode About Me
            </p>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <code className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-mono text-lg font-bold tracking-wider text-amber-400">
                {verificationCode}
              </code>

              <button
                type="button"
                onClick={handleCopyCode}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5"
              >
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>

            <p className="mt-3 text-sm text-slate-400">
              Open your LeetCode profile, edit the About Me section,
              add the code, and save your profile.
            </p>

            <p className="mt-1 text-xs text-slate-500">
              The verification code expires after 15 minutes.
            </p>

            <button
              type="button"
              onClick={handleVerify}
              disabled={verifying}
              className="mt-4 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
            >
              {verifying
                ? "Checking LeetCode..."
                : "Verify Ownership"}
            </button>
          </div>
        )}

        {message && (
          <p className="mt-4 text-sm text-emerald-400">
            {message}
          </p>
        )}

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
        Verify your LeetCode account
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        Enter your public LeetCode username. KTU Mate will generate
        a temporary code that you can place in your LeetCode About Me
        section to prove ownership.
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
          {loading ? "Checking..." : "Start Verification"}
        </button>
      </div>

      {message && (
        <p className="mt-3 text-sm text-emerald-400">
          {message}
        </p>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}