"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#avigu", label: "Avigu AI" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#platform", label: "Platform" },
];

export default function LandingNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-[#090d16]/80 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg text-xl font-black tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 sm:text-2xl"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 text-sm font-extrabold text-white shadow-lg shadow-purple-500/25">
            KT
          </span>
          <span>
            KTU <span className="gradient-text font-black">Mate</span>
          </span>
        </Link>

        <nav
          aria-label="Landing navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              {link.label}
            </a>
          ))}

          <Link
            href="/3d"
            className="rounded text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            3D Hub
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-600/25 transition hover:from-purple-500 hover:to-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            Create account
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="landing-mobile-nav"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-slate-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 lg:hidden"
        >
          <span className="text-base" aria-hidden="true">
            {menuOpen ? "✕" : "☰"}
          </span>
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
      </div>

      {menuOpen && (
        <div
          id="landing-mobile-nav"
          className="mt-3 flex flex-col gap-1 rounded-xl border border-white/10 bg-[#0f172a]/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              {link.label}
            </a>
          ))}

          <Link
            href="/3d"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            3D Hub
          </Link>

          <div className="my-1.5 border-t border-white/10" />

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3.5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-purple-600/20 hover:from-purple-500 hover:to-cyan-500"
          >
            Create account
          </Link>
        </div>
      )}
    </header>
  );
}