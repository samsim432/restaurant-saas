import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Frontend-only for now.
    // Real authentication will be connected during the backend phase.
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#FCFAF6]">
      <header className="border-b border-[#E5E1D8] bg-[#FCFAF6]">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-[#17211D]"
          >
            Restaurant<span className="text-[#E4572E]">OS</span>
          </Link>

          <Link
            to="/"
            className="text-sm font-semibold text-[#17211D] hover:text-[#E4572E]"
          >
            Back to website
          </Link>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
              RestaurantOS
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#17211D]">
              Welcome back
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Sign in to manage your restaurant.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-[#E5E1D8] bg-white p-7 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#17211D]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm text-[#17211D] outline-none transition focus:border-[#E4572E]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#17211D]"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-[#E4572E] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm text-[#17211D] outline-none transition focus:border-[#E4572E]"
                />
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E5E1D8]" />

              <span className="text-xs text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-[#E5E1D8]" />
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#E4572E] hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-gray-500">
            By continuing, you agree to use RestaurantOS according to its
            terms and policies.
          </p>
        </div>
      </main>
    </div>
  );
}