"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState(
    "Government Engineering College, Barton Hill"
  );
  const [course, setCourse] = useState(
    "B.Tech Computer Science & Engineering"
  );
  const [semester, setSemester] = useState(3);

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"signup" | "otp">("signup");

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function sendOtp(e?: React.FormEvent) {
    e?.preventDefault();

    if (
      !email ||
      !password ||
      !fullName ||
      !username ||
      isLoading ||
      isResending
    ) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/signup/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
          username,
          college,
          course,
          semester: Number(semester),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || "Failed to send verification code.");
        setIsLoading(false);
        return;
      }

      setStep("otp");
      setSuccessMessage(
        "Verification code sent! Check your email for the 6-digit OTP."
      );
      setIsLoading(false);
    } catch {
      setErrorMessage(
        "Network error occurred while sending the verification code."
      );
      setIsLoading(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();

    if (otp.length !== 6 || isLoading) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/signup/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || "Invalid verification code.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage("Email verified! Your account has been created.");

      router.push("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage(
        "Network error occurred during email verification. Please try again."
      );
      setIsLoading(false);
    }
  }

  async function resendOtp() {
    if (isResending || isLoading) {
      return;
    }

    setIsResending(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/signup/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
          username,
          college,
          course,
          semester: Number(semester),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || "Failed to resend OTP.");
        setIsResending(false);
        return;
      }

      setOtp("");
      setSuccessMessage("A new verification code has been sent.");
      setIsResending(false);
    } catch {
      setErrorMessage("Network error occurred while resending the OTP.");
      setIsResending(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#090d16] px-6 py-16 text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-600/20 blur-[120px]"
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-2xl">
        <div className="mb-6 text-center">
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

          <h1 className="mt-4 text-xl font-bold text-white">
            {step === "signup"
              ? "Create Your Student Account"
              : "Verify Your Email"}
          </h1>

          <p className="mt-1 text-xs text-slate-400">
            {step === "signup"
              ? "Join KTU Mate to track your academic progress and learn with Avigu"
              : `We sent a 6-digit verification code to ${email}`}
          </p>
        </div>

        {errorMessage && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-5 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-sm text-red-300"
          >
            <p className="font-semibold">
              {step === "otp" ? "Verification failed" : "Registration failed"}
            </p>

            <p className="mt-0.5 text-xs text-red-400">
              {errorMessage}
            </p>
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            aria-live="polite"
            className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3.5 text-sm text-emerald-300"
          >
            {successMessage}
          </div>
        )}

        {step === "signup" ? (
          <form onSubmit={sendOtp} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Avignesh T K"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="avigneshtk"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>

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
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Password (min 6 characters)
              </label>

              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="college"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                KTU Affiliated College
              </label>

              <input
                id="college"
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. CET, TKM, GEC Barton Hill"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label
                  htmlFor="course"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                >
                  Engineering Branch
                </label>

                <select
                  id="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/90 px-3 py-2.5 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                >
                  <option value="B.Tech Computer Science & Engineering">
                    B.Tech Computer Science & Engineering
                  </option>
                  <option value="B.Tech AI & Data Science">
                    B.Tech AI & Data Science
                  </option>
                  <option value="B.Tech Electronics & Communication">
                    B.Tech Electronics & Communication
                  </option>
                  <option value="B.Tech Electrical & Electronics">
                    B.Tech Electrical & Electronics
                  </option>
                  <option value="B.Tech Mechanical Engineering">
                    B.Tech Mechanical Engineering
                  </option>
                  <option value="B.Tech Civil Engineering">
                    B.Tech Civil Engineering
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="semester"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                >
                  Semester
                </label>

                <select
                  id="semester"
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/90 px-3 py-2.5 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>
                      Semester {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={
                isLoading ||
                !email ||
                !password ||
                !fullName ||
                !username
              }
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/25 transition hover:from-purple-500 hover:to-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Sending Verification Code..." : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-5">
            <div>
              <label
                htmlFor="otp"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Verification Code
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                required
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                placeholder="123456"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-white placeholder-slate-600 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />

              <p className="mt-2 text-center text-xs text-slate-500">
                The code is valid for 10 minutes.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/25 transition hover:from-purple-500 hover:to-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify & Create Account"}
            </button>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => {
                  setStep("signup");
                  setOtp("");
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className="text-slate-400 transition hover:text-white"
              >
                ← Edit details
              </button>

              <button
                type="button"
                onClick={resendOtp}
                disabled={isResending || isLoading}
                className="font-semibold text-purple-400 transition hover:text-purple-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </button>
            </div>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="rounded font-semibold text-purple-400 hover:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}