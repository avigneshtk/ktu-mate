import Navbar from "@/components/Navbar";

export default function AnalysisPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Content */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-sm font-semibold text-blue-600">
          Academic Insights
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-950">
          Performance Analysis
        </h2>

        <p className="mt-2 text-gray-600">
          Understand your strengths, weaknesses, and progress across your
          series tests.
        </p>

        {/* Analysis Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-gray-950">
              Strengths
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Your strongest subjects and topics will appear here.
            </p>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-gray-950">
              Weak Areas
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Topics that need more attention will be identified here.
            </p>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-gray-950">
              Progress
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Your improvement between Series Test 1 and 2 will appear here.
            </p>
          </div>
        </div>

        {/* AI Placeholder */}
        <div className="mt-8 rounded-2xl border-2 border-dashed border-blue-300 bg-white p-8 text-center">
          <h3 className="text-xl font-bold text-gray-950">
            Avigu Analysis
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Avigu will later analyse your marks and answers and provide
            personalized recommendations for your KTU public examination.
          </p>

          <p className="mt-4 text-sm font-medium text-blue-600">
            AI functionality will be added in a later stage.
          </p>
        </div>
      </section>
    </main>
  );
}