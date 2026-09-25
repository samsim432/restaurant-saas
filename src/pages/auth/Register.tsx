import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const API_URL = "http://127.0.0.1:8000";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!fullName || !restaurantName || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!agree) {
      setError("Please accept the terms and conditions.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          restaurant_name: restaurantName,
          email,
          phone: phone || null,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed.");
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

          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#E4572E] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-6 py-12">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#E4572E]">
            Get started
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#17211D]">
            Create your restaurant account
          </h1>

          <p className="mt-3 text-gray-600">
            Set up your RestaurantOS account and start managing your restaurant.
          </p>
        </div>

        <div className="rounded-xl border border-[#E5E1D8] bg-white p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                Full name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Samir Simkhada"
                className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                Restaurant name
              </label>

              <input
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="Kathmandu Kitchen"
                className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                Phone
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9800000000"
                className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1"
              />

              <span>
                I agree to the terms and conditions and privacy policy.
              </span>
            </label>

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
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}