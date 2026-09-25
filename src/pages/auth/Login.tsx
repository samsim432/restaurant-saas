import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const API_URL = "http://127.0.0.1:8000";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed.");
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FCFAF6]">
      <header className="border-b border-[#E5E1D8] bg-white">
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

      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#E4572E]">
              Welcome back
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#17211D]">
              Sign in to RestaurantOS
            </h1>

            <p className="mt-3 text-gray-600">
              Manage your restaurant from one place.
            </p>
          </div>

          <div className="rounded-xl border border-[#E5E1D8] bg-white p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-semibold text-[#17211D]">
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
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Your password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 border-t border-[#E5E1D8] pt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-[#E4572E] hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}