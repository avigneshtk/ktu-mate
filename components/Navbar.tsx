"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white px-6 py-4">
      <div className="mx-auto max-w-7xl">

        {/* Top Bar */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold text-gray-950"
          >
            KTU <span className="text-blue-600">Mate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/dashboard"
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              href="/analysis"
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              Analysis
            </Link>

            <Link
              href="/avigu"
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              Avigu
            </Link>

            <Link
              href="/timetable"
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              Timetable
            </Link>

            <Link
              href="/dsa"
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              DSA
            </Link>

            <Link
              href="/leetcode"
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              LeetCode
            </Link>

            <Link
              href="/streak"
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              Streak
            </Link>

            <Link
              href="/profile"
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Profile
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="mt-4 flex flex-col gap-2 border-t pt-4 md:hidden">

            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>

            <Link
              href="/analysis"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              Analysis
            </Link>

            <Link
              href="/avigu"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              Avigu
            </Link>

            <Link
              href="/timetable"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              Timetable
            </Link>

            <Link
              href="/dsa"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              DSA
            </Link>

            <Link
              href="/leetcode"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              LeetCode
            </Link>

            <Link
              href="/streak"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              Streak
            </Link>

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-700"
            >
              Profile
            </Link>

          </div>
        )}
      </div>
    </nav>
  );
}