export default function LeetCodePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-extrabold text-gray-950">
            KTU <span className="text-blue-600">Mate</span>
          </h1>

          <a
            href="/dashboard"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
          >
            Dashboard
          </a>
        </div>
      </nav>

      {/* Page Content */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-center">
          <p className="text-sm font-semibold text-blue-600">
            Coding Practice
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-950">
            LeetCode Practice
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Track your LeetCode practice, solve problems, and improve
            your problem-solving skills.
          </p>
        </div>

        {/* Progress Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              Problems Solved
            </h3>

            <p className="mt-3 text-3xl font-bold text-blue-600">
              0
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Problems completed
            </p>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              Easy
            </h3>

            <p className="mt-3 text-3xl font-bold text-gray-950">
              0
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Easy problems solved
            </p>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              Medium
            </h3>

            <p className="mt-3 text-3xl font-bold text-gray-950">
              0
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Medium problems solved
            </p>
          </div>
        </div>

        {/* Practice Area */}
        <div className="mt-10 rounded-2xl border-2 border-dashed border-blue-300 bg-white p-8 text-center">
          <h3 className="text-xl font-bold text-gray-950">
            LeetCode Progress
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            LeetCode integration, problem recommendations, solved
            problem tracking, and personalized coding goals will be
            added later.
          </p>

          <p className="mt-4 text-sm font-medium text-blue-600">
            LeetCode functionality will be added in a later stage.
          </p>
        </div>
      </section>
    </main>
  );
}