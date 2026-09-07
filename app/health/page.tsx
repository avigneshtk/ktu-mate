import Navbar from "@/components/Navbar";

async function getHealthData() {
  const response = await fetch("http://localhost:3000/api/health", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch health data");
  }

  return response.json();
}

export default async function HealthPage() {
  const data = await getHealthData();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl border border-gray-300 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-blue-600">
            System Status
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-950">
            Health Check
          </h1>

          <p className="mt-2 text-gray-600">
            This page verifies that KTU Mate can fetch and render data
            from its API.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-gray-300 p-5">
              <p className="text-sm font-semibold text-gray-500">
                Status
              </p>

              <p className="mt-2 text-lg font-bold text-green-600">
                {data.status}
              </p>
            </div>

            <div className="rounded-xl border border-gray-300 p-5">
              <p className="text-sm font-semibold text-gray-500">
                Application
              </p>

              <p className="mt-2 font-semibold text-gray-950">
                {data.app}
              </p>
            </div>

            <div className="rounded-xl border border-gray-300 p-5">
              <p className="text-sm font-semibold text-gray-500">
                Message
              </p>

              <p className="mt-2 text-gray-700">
                {data.message}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}