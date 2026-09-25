import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiPost } from "../../api/client";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user_id: number;
  full_name: string;
  email: string;
  restaurant_id: number;
  restaurant_name: string;
  role: "owner" | "manager" | "staff";
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const successMessage = location.state?.message as
    | string
    | undefined;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await apiPost<LoginResponse>(
        "/api/auth/login",
        {
          email: email.trim().toLowerCase(),
          password,
        },
        false,
      );

      localStorage.setItem(
        "access_token",
        data.access_token,
      );

      localStorage.setItem(
        "refresh_token",
        data.refresh_token,
      );

      localStorage.setItem(
        "user_id",
        String(data.user_id),
      );

      localStorage.setItem(
        "user_full_name",
        data.full_name,
      );

      localStorage.setItem(
        "user_email",
        data.email,
      );

      localStorage.setItem(
        "restaurant_id",
        String(data.restaurant_id),
      );

      localStorage.setItem(
        "restaurant_name",
        data.restaurant_name,
      );

      localStorage.setItem(
        "user_role",
        data.role,
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to log in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FCFAF6]">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link
              to="/"
              className="text-2xl font-extrabold text-[#17211D]"
            >
              RestaurantOS
            </Link>

            <h1 className="mt-6 text-3xl font-bold text-[#17211D]">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Sign in to manage your restaurant.
            </p>
          </div>

          <div className="rounded-xl border border-[#E5E1D8] bg-white p-6 sm:p-8">
            {successMessage && (
              <div className="mb-5 rounded-lg border border-[#176B4D]/20 bg-[#176B4D]/10 px-4 py-3 text-sm text-[#176B4D]">
                {successMessage}
              </div>
            )}

            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#17211D]"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#17211D]"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-[#E4572E] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#E4572E] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#CF4D28] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#E4572E] hover:underline"
              >
                Create one
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}