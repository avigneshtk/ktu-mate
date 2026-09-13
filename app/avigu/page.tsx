import Navbar from "@/components/Navbar";
import AviguChat from "@/components/AviguChat";

export default function AviguPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

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

        <div className="mt-10">
          <AviguChat />
        </div>
      </section>
    </main>
  );
}