export default function SeriesTest1Page() {
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
      <section className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm font-semibold text-blue-600">
          Academic Performance
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-950">
          Series Test 1
        </h2>

        <p className="mt-2 text-gray-600">
          Add your Series Test 1 marks, questions, and answers here.
        </p>

        {/* Placeholder */}
        <div className="mt-10 rounded-2xl border border-gray-300 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-950">
            Series Test 1 Data
          </h3>

          <p className="mt-3 text-gray-600">
            This section will later allow you to enter your subjects,
            marks, questions, and answers.
          </p>

          <div className="mt-6 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <p className="font-medium text-gray-700">
              Series Test 1 input area
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Functionality will be added in a later stage.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}