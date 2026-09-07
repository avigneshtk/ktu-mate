import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Profile */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            Student Account
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-950">
            My Profile
          </h2>

          <p className="mt-2 text-gray-600">
            Manage your KTU Mate profile and academic information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="mt-10 rounded-2xl border border-gray-300 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-4xl">
              👤
            </div>

            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-950">
                Student Name
              </h3>

              <p className="mt-1 text-gray-600">
                KTU CSE Student
              </p>
            </div>
          </div>

          {/* Information */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-300 p-5">
              <p className="text-sm font-semibold text-gray-500">
                Name
              </p>

              <p className="mt-2 font-semibold text-gray-950">
                Student Name
              </p>
            </div>

            <div className="rounded-xl border border-gray-300 p-5">
              <p className="text-sm font-semibold text-gray-500">
                Email
              </p>

              <p className="mt-2 font-semibold text-gray-950">
                student@example.com
              </p>
            </div>

            <div className="rounded-xl border border-gray-300 p-5">
              <p className="text-sm font-semibold text-gray-500">
                Branch
              </p>

              <p className="mt-2 font-semibold text-gray-950">
                Computer Science & Engineering
              </p>
            </div>

            <div className="rounded-xl border border-gray-300 p-5">
              <p className="text-sm font-semibold text-gray-500">
                Semester
              </p>

              <p className="mt-2 font-semibold text-gray-950">
                Semester 3
              </p>
            </div>
          </div>

          {/* Future Functionality */}
          <div className="mt-8 rounded-xl border-2 border-dashed border-blue-300 p-8 text-center">
            <h3 className="text-lg font-bold text-gray-950">
              Profile Settings
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Profile editing, KTU academic details, preferences,
              and account settings will be added later.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}