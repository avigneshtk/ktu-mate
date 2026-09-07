export default function DsaPage() {
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
            CSE Technical Practice
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-950">
            DSA Practice
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Practice Data Structures and Algorithms and improve your
            problem-solving skills step by step.
          </p>
        </div>

        {/* Topics */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              Arrays
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Practice array-based problems and techniques.
            </p>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              Strings
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Solve string manipulation and pattern problems.
            </p>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              Linked Lists
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Practice singly and doubly linked list problems.
            </p>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              Stacks & Queues
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Learn and practice stack and queue-based problems.
            </p>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              Searching & Sorting
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Practice important searching and sorting algorithms.
            </p>
          </div>

          <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-950">
              Trees & Graphs
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Build your understanding of advanced data structures.
            </p>
          </div>
        </div>

        {/* Practice Placeholder */}
        <div className="mt-10 rounded-2xl border-2 border-dashed border-blue-300 bg-white p-8 text-center">
          <h3 className="text-xl font-bold text-gray-950">
            DSA Problem Practice
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Problems, difficulty levels, solutions, progress tracking,
            and personalized DSA recommendations will be added later.
          </p>

          <p className="mt-4 text-sm font-medium text-blue-600">
            DSA functionality will be added in a later stage.
          </p>
        </div>
      </section>
    </main>
  );
}