import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { apiPost } from "../../api/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await apiPost<{ message: string }>(
        "/api/auth/forgot-password",
        {
          email,
        },
      );

      setMessage(response.message);
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
    <div className="min-h-screen bg-[#FCFAF6] px-6 py-12">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <Card className="w-full p-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-[#E4572E]">
              RestaurantOS
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#17211D]">
              Forgot your password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Enter your email address and we'll send you a
              password reset code.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#17211D]"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading
                ? "Sending..."
                : "Send Reset Code"}
            </Button>
          </form>

          <div className="mt-6 border-t border-[#E5E1D8] pt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-semibold text-[#17211D] hover:text-[#E4572E]"
            >
              Back to login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}