import Navbar from "@/components/Navbar";

export default function StreakPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Content */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-center">
          <p className="text-sm font-semibold text-blue-600">
            Consistency & Progress
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-950">
            Daily Streak
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Stay consistent with your studies, DSA practice, and
            coding goals.
          </p>
        </div>

        {/* Streak Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-300 bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-semibold text-gray-600">
              Current Streak
            </p>

            <p className="mt-3 text-4xl font-extrabold text-blue-600">
              0
            </p>

            <p className="mt-1 text-sm text-gray-500">
              days
            </p>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-semibold text-gray-600">
              Best Streak
            </p>

            <p className="mt-3 text-4xl font-extrabold text-gray-950">
              0
            </p>

            <p className="mt-1 text-sm text-gray-500">
              days
            </p>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-semibold text-gray-600">
              Study Days
            </p>

            <p className="mt-3 text-4xl font-extrabold text-gray-950">
              0
            </p>

            <p className="mt-1 text-sm text-gray-500">
              total days
            </p>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="mt-10 rounded-2xl border border-gray-300 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-950">
            Weekly Progress
          </h3>

          <p className="mt-2 text-gray-600">
            Your weekly study and practice activity will appear here.
          </p>

          <div className="mt-8 grid grid-cols-7 gap-3">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day) => (
                <div
                  key={day}
                  className="rounded-lg border border-gray-300 p-4 text-center"
                >
                  <p className="text-sm font-semibold text-gray-700">
                    {day}
                  </p>

                  <div className="mx-auto mt-3 h-8 w-8 rounded-md bg-gray-200" />
                </div>
              )
            )}
          </div>
        </div>

        {/* Motivation */}
        <div className="mt-8 rounded-2xl border-2 border-dashed border-blue-300 bg-white p-8 text-center">
          <h3 className="text-xl font-bold text-gray-950">
            Keep Going! 🚀
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Avigu will later provide personalized motivation based on
            your study consistency and academic progress.
          </p>
        </div>
      </section>
    </main>
  );
}