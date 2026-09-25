import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function Onboarding() {
  const navigate = useNavigate();

  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!restaurantName || !address || !city || !phone) {
      setError("Please complete all fields.");
      return;
    }

    // Frontend-only for now.
    // Backend restaurant creation will be connected later.
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#FCFAF6]">
      <header className="border-b border-[#E5E1D8] bg-white">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center px-6">
          <div className="text-xl font-bold tracking-tight text-[#17211D]">
            Restaurant<span className="text-[#E4572E]">OS</span>
          </div>

          <div className="ml-auto text-sm text-gray-500">
            Step 1 of 3
          </div>
        </div>
      </header>

      <main className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
              Restaurant setup
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#17211D] md:text-4xl">
              Tell us about your restaurant.
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">
              We'll use these details to create your restaurant workspace.
            </p>
          </div>

          <div className="mt-10">
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E4572E] text-sm font-bold text-white">
                  1
                </span>

                <span className="hidden text-sm font-semibold text-[#17211D] sm:block">
                  Restaurant
                </span>
              </div>

              <div className="h-px w-12 bg-[#E5E1D8]" />

              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E1D8] bg-white text-sm font-semibold text-gray-400">
                  2
                </span>

                <span className="hidden text-sm text-gray-400 sm:block">
                  Tables
                </span>
              </div>

              <div className="h-px w-12 bg-[#E5E1D8]" />

              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E1D8] bg-white text-sm font-semibold text-gray-400">
                  3
                </span>

                <span className="hidden text-sm text-gray-400 sm:block">
                  Menu
                </span>
              </div>
            </div>

            <Card className="p-7 md:p-9">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

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
                    placeholder="e.g. Kathmandu Kitchen"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm text-[#17211D] outline-none transition focus:border-[#E4572E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="text-sm font-semibold text-[#17211D]"
                  >
                    Restaurant address
                  </label>

                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Street, area or landmark"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm text-[#17211D] outline-none transition focus:border-[#E4572E]"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="city"
                      className="text-sm font-semibold text-[#17211D]"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      placeholder="Kathmandu"
                      className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm text-[#17211D] outline-none transition focus:border-[#E4572E]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold text-[#17211D]"
                    >
                      Restaurant phone
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+977 98XXXXXXXX"
                      className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm text-[#17211D] outline-none transition focus:border-[#E4572E]"
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-[#F7F5F0] p-4">
                  <p className="text-sm font-semibold text-[#17211D]">
                    What happens next?
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    After this, you'll set up your restaurant tables and
                    create your menu.
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Continue to Tables
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}