import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { apiPost } from "../../api/client";

interface LocationState {
  email?: string;
}

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;

  const [email, setEmail] = useState(state?.email ?? "");
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!email || code.length !== 6) {
      setError("Enter your email and the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);

      await apiPost("/api/auth/verify-email", {
        email,
        code,
      });

      setMessage(
        "Email verified successfully. Redirecting to login...",
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Verification failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setMessage("");

    if (!email) {
      setError("Enter your email address first.");
      return;
    }

    try {
      setResending(true);

      const response = await apiPost<{ message: string }>(
        "/api/auth/resend-verification",
        {
          email,
        },
      );

      setMessage(response.message);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not resend the verification code.",
      );
    } finally {
      setResending(false);
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
              Verify your email
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              We sent a 6-digit verification code to your email address.
            </p>
          </div>

          <form
            onSubmit={handleVerify}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                Verification code
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(event) =>
                  setCode(
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6),
                  )
                }
                placeholder="123456"
                className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-center text-lg font-semibold tracking-[0.35em] outline-none transition focus:border-[#E4572E]"
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
              {loading ? "Verifying..." : "Verify Email"}
            </Button>

            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="w-full text-sm font-semibold text-[#E4572E] hover:underline disabled:opacity-50"
            >
              {resending
                ? "Sending..."
                : "Didn't receive the code? Resend"}
            </button>
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