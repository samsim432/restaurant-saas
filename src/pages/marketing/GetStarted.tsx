import { Link } from "react-router-dom";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const steps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Create your restaurant owner account with your basic business details.",
  },
  {
    number: "02",
    title: "Set up your restaurant",
    description:
      "Add your restaurant information, tables, menu and operating hours.",
  },
  {
    number: "03",
    title: "Start accepting orders",
    description:
      "Place your QR codes on tables and let customers start ordering.",
  },
];

export default function GetStarted() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="border-b border-[#E5E1D8]">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
              Get started
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-[#17211D] md:text-7xl">
              Get your restaurant
              <span className="block text-[#E4572E]">
                ready for smarter ordering.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
              Create your account, set up your restaurant and start using
              QR ordering and restaurant management tools.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button className="px-8 py-3.5">
                  Create Restaurant Account
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  variant="secondary"
                  className="px-8 py-3.5"
                >
                  Already have an account?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Setup steps */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
              Simple setup
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#17211D] md:text-5xl">
              From signup to first order.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
              Get your restaurant online with a straightforward setup
              process.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <Card key={step.number} className="p-7 md:p-8">
                <span className="text-sm font-bold text-[#E4572E]">
                  {step.number}
                </span>

                <h3 className="mt-6 text-xl font-bold text-[#17211D]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="border-y border-[#E5E1D8] bg-[#FCFAF6]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
                Your restaurant workspace
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#17211D] md:text-5xl">
                Everything starts from one dashboard.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Once your restaurant is set up, your team will have one
                place to manage orders, tables, menu items and daily
                operations.
              </p>

              <div className="mt-8">
                <Link to="/features">
                  <Button variant="secondary">
                    See All Features
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="p-7 md:p-9">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-5">
                <div>
                  <p className="text-sm text-gray-500">
                    Restaurant workspace
                  </p>

                  <p className="mt-1 text-xl font-bold text-[#17211D]">
                    Your Restaurant
                  </p>
                </div>

                <span className="rounded-full bg-[#176B4D]/10 px-3 py-1 text-xs font-bold text-[#176B4D]">
                  Active
                </span>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4">
                {[
                  ["Orders", "128"],
                  ["Tables", "24"],
                  ["Menu items", "86"],
                  ["Today's sales", "NPR 42,800"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-[#E5E1D8] bg-[#FCFAF6] p-4"
                  >
                    <p className="text-xs text-gray-500">
                      {label}
                    </p>

                    <p className="mt-2 font-bold text-[#17211D]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg bg-[#17211D] p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Order status
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm">
                    Live orders
                  </span>

                  <span className="font-bold text-[#F2B84B]">
                    12
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#176B4D]/10 text-lg font-bold text-[#176B4D]">
            ✓
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#17211D] md:text-4xl">
            No customer app required.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Your customers can simply scan a QR code with their phone,
            browse your menu and place an order. They don't need to download
            an app or create an account.
          </p>

          <div className="mt-8">
            <Link to="/register">
              <Button>
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:pb-28">
        <div className="rounded-2xl bg-[#17211D] px-8 py-12 text-white md:px-14 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F2B84B]">
            Start today
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
            Your restaurant is ready for a simpler workflow.
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-gray-300">
            Create your account and start setting up your restaurant.
          </p>

          <div className="mt-8">
            <Link to="/register">
              <Button>
                Create Restaurant Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}