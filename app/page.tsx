export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b px-6 py-4 md:px-12">
        <div className="text-2xl font-bold">
          KTU <span className="text-blue-600">Mate</span>
        </div>

        <a
          href="/login"
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Login
        </a>
      </nav>

      {/* Hero Section */}
      <section className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-20">
        <div className="max-w-4xl text-center">
          <p className="mb-4 font-medium text-blue-600">
            Your AI-powered KTU companion
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Study smarter with{" "}
            <span className="text-blue-600">KTU Mate</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Analyse your series test performance, discover your weak areas,
            create personalized study plans, practice DSA, and prepare
            smarter for your KTU public examinations with Avigu.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/login"
              className="rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </a>

            <a
              href="/dashboard"
              className="rounded-lg border border-gray-300 px-7 py-3 font-semibold transition hover:bg-gray-100"
            >
              View Dashboard
            </a>
          </div>

          {/* Avigu Section */}
          <div className="mx-auto mt-16 max-w-2xl rounded-2xl border bg-gray-50 p-6 text-left">
            <p className="text-sm font-semibold text-blue-600">
              🤖 Meet Avigu
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Your personal AI academic companion
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Avigu analyses your academic performance and helps you understand
              what to study, where to improve, and how to prepare for your
              upcoming examinations.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}