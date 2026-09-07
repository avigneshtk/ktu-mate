import Navbar from "@/components/Navbar";

export default function TimetablePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Content */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="text-center">
          <p className="text-sm font-semibold text-blue-600">
            Personalized Study Planning
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-950">
            AI Study Timetable
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Avigu will create a personalized study timetable based on
            your subjects, weak areas, exam dates, and available study time.
          </p>
        </div>

        {/* Timetable Generator */}
        <div className="mt-10 rounded-2xl border border-gray-300 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-950">
            Create Your Study Plan
          </h3>

          <p className="mt-2 text-gray-600">
            Tell Avigu about your study requirements and it will
            generate a suitable timetable.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-300 p-5">
              <h4 className="font-bold text-gray-950">
                Available Study Time
              </h4>

              <p className="mt-2 text-sm text-gray-600">
                Your daily available study hours.
              </p>
            </div>

            <div className="rounded-xl border border-gray-300 p-5">
              <h4 className="font-bold text-gray-950">
                Exam Dates
              </h4>

              <p className="mt-2 text-sm text-gray-600">
                Your upcoming KTU examination dates.
              </p>
            </div>

            <div className="rounded-xl border border-gray-300 p-5">
              <h4 className="font-bold text-gray-950">
                Weak Subjects
              </h4>

              <p className="mt-2 text-sm text-gray-600">
                Subjects and topics that need more attention.
              </p>
            </div>

            <div className="rounded-xl border border-gray-300 p-5">
              <h4 className="font-bold text-gray-950">
                Technical Goals
              </h4>

              <p className="mt-2 text-sm text-gray-600">
                DSA, LeetCode, and other practice goals.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border-2 border-dashed border-blue-300 p-8 text-center">
            <p className="font-semibold text-gray-700">
              AI timetable generator
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Functionality will be added in a later stage.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}