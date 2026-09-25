import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (
      !fullName ||
      !restaurantName ||
      !email ||
      !phone ||
      !password
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (!agree) {
      setError("Please accept the terms to continue.");
      return;
    }

    // Frontend-only for now.
    // Real account creation will be connected to FastAPI later.
    navigate("/onboarding");
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
            to="/login"
            className="text-sm font-semibold text-[#17211D] hover:text-[#E4572E]"
          >
            Already have an account?
          </Link>
        </div>
      </header>

      <main className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
              Create your account
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#17211D] md:text-4xl">
              Start your restaurant setup.
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Create your owner account and we'll guide you through the
              restaurant setup.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-[#E5E1D8] bg-white p-7 md:p-9">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-[#17211D]"
                >
                  Your full name
                </label>

                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                  className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
                />
              </div>

              <div>
                <label
                  htmlFor="restaurantName"
                  className="text-sm font-semibold text-[#17211D]"
                >
                  Restaurant name
                </label>

                <input
                  id="restaurantName"
                  type="text"
                  value={restaurantName}
                  onChange={(event) =>
                    setRestaurantName(event.target.value)
                  }
                  placeholder="Your restaurant"
                  autoComplete="organization"
                  className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
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
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-[#17211D]"
                  >
                    Phone number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+977 98XXXXXXXX"
                    autoComplete="tel"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#17211D]"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E4572E]"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Use at least 8 characters.
                </p>
              </div>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(event) => setAgree(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#E4572E]"
                />

                <span className="text-sm leading-6 text-gray-600">
                  I agree to the terms and understand how RestaurantOS
                  handles restaurant account information.
                </span>
              </label>

              <Button type="submit" className="w-full">
                Create Restaurant Account
              </Button>
            </form>

            <div className="mt-7 border-t border-[#E5E1D8] pt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#E4572E] hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <span className="text-[#176B4D]">✓</span>
            No customer app required
          </div>
        </div>
      </main>
    </div>
  );
}