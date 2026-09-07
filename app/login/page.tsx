export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-300 bg-white p-8 shadow-md">
        
        {/* Logo / Title */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-950">
            KTU <span className="text-blue-600">Mate</span>
          </h1>

          <p className="mt-2 text-base font-medium text-gray-700">
            Your AI-powered KTU companion
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-5">
          
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-gray-900"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-600"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-gray-900"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-600"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {/* Signup */}
        <p className="mt-6 text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <span className="font-semibold text-blue-600">
            Create one
          </span>
        </p>
      </div>
    </main>
  );
}