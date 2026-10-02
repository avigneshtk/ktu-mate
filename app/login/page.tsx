"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || "Invalid email or password");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage("Network error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  async function handleDemoLogin() {
    setEmail("avignesh@ktu.edu.in");
    setPassword("password123");
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // First attempt login
      let res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "avignesh@ktu.edu.in",
          password: "password123",
        }),
      });

      // If demo user does not exist yet, provision it automatically!
      if (!res.ok) {
        await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "avignesh@ktu.edu.in",
            password: "password123",
            fullName: "Avignesh T K",
            username: "avigneshtk",
            college: "Government Engineering College, Barton Hill",
            course: "B.Tech Computer Science & Engineering",
            semester: 5,
          }),
        });

        res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "avignesh@ktu.edu.in",
            password: "password123",
          }),
        });
      }

      const data = await res.json();
      if (data.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setErrorMessage(data.error || "Demo login failed");
        setIsLoading(false);
      }
    } catch {
      setErrorMessage("Failed to initiate demo session");
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#090d16] px-6 py-12 text-slate-100">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg text-3xl font-black tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 text-base font-extrabold text-white shadow-lg shadow-purple-500/25">
              KT
            </span>
            <span>
              KTU <span className="gradient-text font-black">Mate</span>
            </span>
          </Link>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to access your dashboard, DSA tracker & Avigu
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-6 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-sm text-red-300"
          >
            <p className="font-semibold">Sign in failed</p>
            <p className="text-xs text-red-400 mt-0.5">{errorMessage}</p>
          </div>
        )}

        {/* 1-Click Demo Login Button */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full rounded-xl border border-cyan-500/40 bg-cyan-950/30 p-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-900/40 hover:border-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-50"
          >
            ⚡ One-Click Demo Student Sign In
          </button>
        </div>

        <div className="relative mb-6 text-center text-xs text-slate-500">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative bg-[#101728] px-3">or continue with email</span>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@ktu.edu.in"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/25 transition hover:from-purple-500 hover:to-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-slate-400">
          New to KTU Mate?{" "}
          <Link
            href="/signup"
            className="font-semibold text-purple-400 hover:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}