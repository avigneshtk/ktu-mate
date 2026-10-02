"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/avigu", label: "Avigu", isAi: true },
  { href: "/dsa", label: "DSA" },
  { href: "/leetcode", label: "LeetCode" },
  { href: "/timetable", label: "Timetable" },
  { href: "/analysis", label: "Analysis" },
  { href: "/streak", label: "Streak" },
  { href: "/3d", label: "3D Desk" },
];

const ACCOUNT_ITEMS = [
  { href: "/profile", label: "Profile" },
  { href: "/settings", label: "Settings" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/login");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b border-white/10 bg-[#090d16]/80 px-4 py-3.5 backdrop-blur-xl sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-lg text-xl font-black tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16] sm:text-2xl"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 text-sm font-extrabold text-white shadow-lg shadow-purple-500/25 transition-transform motion-safe:group-hover:scale-105">
              KT
            </span>

            <span>
              KTU <span className="gradient-text font-black">Mate</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 xl:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16] ${
                    isActive
                      ? "border border-purple-500/30 bg-purple-600/15 font-semibold text-purple-300 shadow-sm"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.isAi ? (
                    <span className="flex items-center gap-1.5">
                      <span className="flex h-2 w-2 rounded-full bg-cyan-400 motion-safe:animate-pulse" />
                      {item.label}
                    </span>
                  ) : (
                    item.label
                  )}
                </Link>
              );
            })}

            <div
              className="mx-2 h-5 w-px bg-white/10"
              aria-hidden="true"
            />

            {ACCOUNT_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16] ${
                    item.href === "/settings"
                      ? "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                      : "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md shadow-purple-600/20 hover:from-purple-500 hover:to-cyan-500"
                  } ${isActive ? "ring-2 ring-purple-400/50" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-slate-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16] xl:hidden"
          >
            <span className="text-base" aria-hidden="true">
              {menuOpen ? "✕" : "☰"}
            </span>

            <span>{menuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div
            id="mobile-navigation"
            className="mt-3 flex flex-col gap-1 rounded-xl border border-white/10 bg-[#0f172a]/95 p-3 shadow-2xl backdrop-blur-2xl xl:hidden"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "border border-purple-500/30 bg-purple-600/20 font-semibold text-purple-300"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.isAi && (
                      <span className="h-2 w-2 rounded-full bg-cyan-400 motion-safe:animate-pulse" />
                    )}

                    {item.label}
                  </span>

                  {isActive && (
                    <span className="text-xs text-purple-400">Active</span>
                  )}
                </Link>
              );
            })}

            <div className="my-2 border-t border-white/10" />

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-purple-600/20 hover:from-purple-500 hover:to-cyan-500"
            >
              Profile
            </Link>

            <Link
              href="/settings"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/10"
            >
              Settings
            </Link>

            {/* Mobile Logout */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-center text-sm font-semibold text-red-300 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}