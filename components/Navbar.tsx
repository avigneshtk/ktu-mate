import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-gray-950"
        >
          KTU <span className="text-blue-600">Mate</span>
        </Link>

        {/* Navigation Links */}
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

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden">
          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Menu
          </Link>
        </div>
      </div>
    </nav>
  );
}