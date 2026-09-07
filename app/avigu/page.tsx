import Navbar from "@/components/Navbar";

export default function AviguPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Avigu */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="text-center">
          <p className="text-sm font-semibold text-blue-600">
            Your AI Academic Agent
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-950">
            Meet Avigu 🤖
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Avigu analyses your academic performance and helps you decide
            what to study, where to improve, and how to prepare for your
            KTU public examinations.
          </p>
        </div>

        {/* AI Chat Placeholder */}
        <div className="mt-10 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
          <div className="min-h-[300px] rounded-xl border-2 border-dashed border-gray-300 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl">
                🤖
              </div>

              <div>
                <h3 className="font-bold text-gray-950">
                  Avigu
                </h3>

                <p className="mt-2 text-gray-600">
                  Hi! I’m Avigu, your personal academic companion.
                  I’ll help you understand your performance and create
                  a smarter study strategy.
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm font-medium text-gray-500">
                AI conversation interface will be added later.
              </p>
            </div>
          </div>

          {/* Message Input Placeholder */}
          <div className="mt-5 flex gap-3">
            <input
              type="text"
              placeholder="Ask Avigu something..."
              disabled
              className="flex-1 rounded-lg border-2 border-gray-300 bg-gray-100 px-4 py-3 text-gray-900 placeholder:text-gray-500"
            />

            <button
              disabled
              className="rounded-lg bg-gray-400 px-6 py-3 font-semibold text-white"
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}