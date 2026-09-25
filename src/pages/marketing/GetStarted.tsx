import { Link } from "react-router-dom";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const steps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Create your restaurant owner account with your basic business details and get your workspace ready.",
  },
  {
    number: "02",
    title: "Set up your restaurant",
    description:
      "Add your restaurant information, tables, menu items, operating hours and payment options.",
  },
  {
    number: "03",
    title: "Generate your QR codes",
    description:
      "Create table QR codes and place them where your customers can easily scan and order.",
  },
  {
    number: "04",
    title: "Start accepting orders",
    description:
      "Customers scan, browse your menu and order while your team manages everything from one place.",
  },
];

const workspaceItems = [
  {
    label: "Orders",
    value: "128",
  },
  {
    label: "Tables",
    value: "24",
  },
  {
    label: "Menu items",
    value: "86",
  },
  {
    label: "Today's sales",
    value: "NPR 42,800",
  },
];

export default function GetStarted() {
  return (
    <MarketingLayout>
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden border-b border-[#E5E1D8] bg-[#FCFAF6]">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#E4572E]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#176B4D]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-6 md:grid-cols-2 md:gap-16 md:pb-28 md:pt-24 lg:px-8">
          {/* Hero content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-semibold text-[#176B4D] shadow-sm sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#176B4D]" />
              Simple setup · Built for restaurants
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#17211D] sm:text-5xl md:text-6xl">
              Get your restaurant
              <span className="mt-1 block text-[#E4572E]">
                ready in simple steps.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg md:text-xl md:leading-8">
              Create your account, configure your restaurant and start
              accepting QR orders from your customers.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="w-full sm:w-auto">
                <Button className="w-full px-7 py-3.5 sm:w-auto">
                  Create Restaurant Account
                </Button>
              </Link>

              <Link to="/login" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  className="w-full px-7 py-3.5 sm:w-auto"
                >
                  Log In
                </Button>
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-gray-500 sm:text-sm">
              <span className="flex items-center gap-2">
                <span className="font-bold text-[#176B4D]">✓</span>
                No customer app
              </span>

              <span className="flex items-center gap-2">
                <span className="font-bold text-[#176B4D]">✓</span>
                QR ordering
              </span>

              <span className="flex items-center gap-2">
                <span className="font-bold text-[#176B4D]">✓</span>
                Easy setup
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[28px] border border-[#E5E1D8] bg-white p-2 shadow-[0_25px_80px_rgba(23,33,29,0.13)]">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85"
                alt="Restaurant owner using a digital restaurant management system"
                className="h-[300px] w-full rounded-[22px] object-cover sm:h-[390px]"
              />
            </div>

            {/* Floating setup card */}
            <div className="absolute -bottom-5 left-3 right-3 rounded-2xl border border-[#E5E1D8] bg-white p-4 shadow-xl sm:left-6 sm:right-auto sm:w-64 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    Setup progress
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#17211D]">
                    Restaurant workspace
                  </p>
                </div>

                <span className="rounded-full bg-[#176B4D]/10 px-2.5 py-1 text-[10px] font-bold text-[#176B4D]">
                  3 / 4
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#EAE6DE]">
                <div className="h-full w-3/4 rounded-full bg-[#176B4D]" />
              </div>

              <p className="mt-2 text-[11px] text-gray-500">
                Almost ready to accept orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SETUP STEPS
      ========================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E4572E] sm:text-sm">
              Simple setup
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[#17211D] sm:text-4xl md:text-5xl">
              From signup to first order.
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Everything you need to get your restaurant online without a
              complicated setup process.
            </p>
          </div>

          {/* 2 columns on mobile, 4 on desktop */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {steps.map((step) => (
              <Card
                key={step.number}
                className="group min-h-[270px] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[300px] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#E4572E] sm:text-2xl">
                    {step.number}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-[#E5E1D8] transition-colors duration-300 group-hover:bg-[#E4572E]" />
                </div>

                <div className="mt-6 h-px w-10 bg-[#E5E1D8] transition-all duration-300 group-hover:w-16 group-hover:bg-[#E4572E]" />

                <h3 className="mt-5 text-base font-bold leading-6 text-[#17211D] sm:text-xl">
                  {step.title}
                </h3>

                <p className="mt-3 text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          DASHBOARD / WORKSPACE
      ========================================================== */}
      <section className="border-y border-[#E5E1D8] bg-[#FCFAF6]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            {/* Copy */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E4572E] sm:text-sm">
                Your restaurant workspace
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-[#17211D] sm:text-4xl md:text-5xl">
                Everything starts from
                <span className="block text-[#176B4D]">
                  one dashboard.
                </span>
              </h2>

              <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                Once your restaurant is set up, your team gets one central
                place to manage orders, tables, menu items, payments and
                daily operations.
              </p>

              <div className="mt-8">
                <Link to="/features" className="inline-block w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    className="w-full px-6 py-3 sm:w-auto"
                  >
                    Explore All Features
                  </Button>
                </Link>
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="relative">
              <Card className="overflow-hidden p-0 shadow-[0_20px_60px_rgba(23,33,29,0.10)]">
                {/* Dashboard header */}
                <div className="flex items-center justify-between border-b border-[#E5E1D8] bg-white p-5 sm:p-6">
                  <div>
                    <p className="text-xs text-gray-500">
                      Restaurant workspace
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#17211D] sm:text-xl">
                      Your Restaurant
                    </p>
                  </div>

                  <span className="rounded-full bg-[#176B4D]/10 px-3 py-1.5 text-[10px] font-bold text-[#176B4D] sm:text-xs">
                    Active
                  </span>
                </div>

                {/* Dashboard content */}
                <div className="bg-[#FCFAF6] p-4 sm:p-6">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {workspaceItems.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-[#E5E1D8] bg-white p-3 sm:p-4"
                      >
                        <p className="text-[10px] text-gray-500 sm:text-xs">
                          {item.label}
                        </p>

                        <p className="mt-2 break-words text-sm font-bold text-[#17211D] sm:text-lg">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Live orders */}
                  <div className="mt-4 rounded-xl bg-[#17211D] p-4 text-white sm:p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 sm:text-xs">
                          Live orders
                        </p>

                        <p className="mt-2 text-xl font-bold sm:text-2xl">
                          12
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2B84B]/15">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#F2B84B]" />
                      </div>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[68%] rounded-full bg-[#F2B84B]" />
                    </div>

                    <p className="mt-2 text-[10px] text-gray-400 sm:text-xs">
                      Orders currently being processed
                    </p>
                  </div>
                </div>
              </Card>

              {/* Floating notification */}
              <div className="absolute -bottom-5 -right-2 hidden rounded-xl border border-[#E5E1D8] bg-white p-4 shadow-xl sm:block sm:right-4">
                <p className="text-[10px] text-gray-500">
                  Latest activity
                </p>

                <p className="mt-1 text-xs font-bold text-[#17211D]">
                  New order received
                </p>

                <p className="mt-1 text-[10px] text-[#176B4D]">
                  Table #08 · Just now
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          NO APP SECTION
      ========================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 md:py-24">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#176B4D]/10 text-xl font-bold text-[#176B4D]">
            ✓
          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#E4572E] sm:text-sm">
            Customer experience
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[#17211D] sm:text-4xl md:text-5xl">
            No customer app required.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Customers simply scan a QR code with their phone, browse your
            menu and place an order. No app download and no complicated
            registration.
          </p>

          <div className="mt-8">
            <Link to="/register" className="inline-block w-full sm:w-auto">
              <Button className="w-full px-7 py-3.5 sm:w-auto">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="px-5 pb-20 sm:px-6 md:pb-28 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#17211D] px-6 py-14 text-white sm:px-10 md:px-14 md:py-20">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#E4572E]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#176B4D]/20 blur-3xl" />

          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F2B84B] sm:text-sm">
              Start today
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl md:text-5xl">
              Your restaurant is ready for a simpler workflow.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
              Create your account, set up your restaurant and start building
              a better ordering experience for your customers.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="w-full sm:w-auto">
                <Button className="w-full px-7 py-3.5 sm:w-auto">
                  Create Restaurant Account
                </Button>
              </Link>

              <Link to="/contact" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  className="w-full border-white/20 bg-white/10 px-7 py-3.5 text-white hover:bg-white/20 sm:w-auto"
                >
                  Talk to us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}