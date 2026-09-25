import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { apiPost } from "../../api/client";

interface LocationState {
  email?: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;

  const [email, setEmail] = useState(state?.email ?? "");
  const [code, setCode] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [step, setStep] = useState<"verify" | "reset">(
    "verify",
  );

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleVerifyCode(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (code.length !== 6) {
      setError("Please enter the 6-digit reset code.");
      return;
    }

    try {
      setLoading(true);

      const response = await apiPost<{ message: string }>(
        "/api/auth/verify-reset-code",
        {
          email,
          code,
        },
      );

      setMessage(response.message);
      setStep("reset");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid reset code. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (newPassword.length < 8) {
      setError(
        "Password must be at least 8 characters.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await apiPost(
        "/api/auth/reset-password",
        {
          email,
          code,
          new_password: newPassword,
        },
      );

      setMessage(
        "Password reset successfully. Redirecting to login...",
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not reset your password.",
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
              {step === "verify"
                ? "Reset your password"
                : "Create a new password"}
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              {step === "verify"
                ? "Enter the 6-digit code sent to your email."
                : "Choose a new password for your RestaurantOS account."}
            </p>
          </div>

          {step === "verify" ? (
            <form
              onSubmit={handleVerifyCode}
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

              <div>
                <label
                  htmlFor="code"
                  className="mb-2 block text-sm font-semibold text-[#17211D]"
                >
                  Reset code
                </label>

                <input
                  id="code"
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
                {loading
                  ? "Verifying..."
                  : "Verify Code"}
              </Button>
            </form>
          ) : (
            <form
              onSubmit={handleResetPassword}
              className="mt-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="new-password"
                  className="mb-2 block text-sm font-semibold text-[#17211D]"
                >
                  New password
                </label>

                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(event.target.value)
                  }
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-semibold text-[#17211D]"
                >
                  Confirm new password
                </label>

                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Enter password again"
                  autoComplete="new-password"
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
                  ? "Resetting..."
                  : "Reset Password"}
              </Button>
            </form>
          )}

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