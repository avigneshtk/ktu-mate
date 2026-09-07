import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            Welcome to KTU Mate
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-950">
            Dashboard
          </h2>

          <p className="mt-2 text-gray-600">
            Your academic progress and study tools will appear here.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Series Tests */}
          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              Series Tests
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Track your Series Test 1 and Series Test 2 marks and answers.
            </p>
          </div>

          {/* Avigu */}
          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              Avigu AI
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Get personalized academic analysis and recommendations.
            </p>
          </div>

          {/* Study Plan */}
          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              Study Plan
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Create personalized study timetables based on your progress.
            </p>
          </div>

          {/* DSA */}
          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              DSA Practice
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Practice data structures and algorithms.
            </p>
          </div>

          {/* LeetCode */}
          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              LeetCode
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Track your coding practice and problem-solving progress.
            </p>
          </div>

          {/* Streak */}
          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              Daily Streak
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Your daily study and practice streak will appear here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}