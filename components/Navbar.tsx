"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      className="border-b bg-white px-6 py-4"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="rounded text-2xl font-extrabold text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            KTU <span className="text-blue-600">Mate</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/dashboard"
              className="rounded font-medium text-gray-700 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Dashboard
            </Link>

            <Link
              href="/analysis"
              className="rounded font-medium text-gray-700 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Analysis
            </Link>

            <Link
              href="/avigu"
              className="rounded font-medium text-gray-700 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Avigu
            </Link>

            <Link
              href="/timetable"
              className="rounded font-medium text-gray-700 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Timetable
            </Link>

            <Link
              href="/dsa"
              className="rounded font-medium text-gray-700 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              DSA
            </Link>

            <Link
              href="/leetcode"
              className="rounded font-medium text-gray-700 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              LeetCode
            </Link>

            <Link
              href="/streak"
              className="rounded font-medium text-gray-700 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Streak
            </Link>

            <Link
              href="/profile"
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Profile
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="mt-4 flex flex-col gap-2 border-t pt-4 md:hidden"
          >
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Dashboard
            </Link>

            <Link
              href="/analysis"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Analysis
            </Link>

            <Link
              href="/avigu"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Avigu
            </Link>

            <Link
              href="/timetable"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Timetable
            </Link>

            <Link
              href="/dsa"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              DSA
            </Link>

            <Link
              href="/leetcode"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              LeetCode
            </Link>

            <Link
              href="/streak"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Streak
            </Link>

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}