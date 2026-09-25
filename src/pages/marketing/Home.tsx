import { Link } from "react-router-dom";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const features = [
  {
    number: "01",
    title: "QR Ordering",
    description:
      "Customers scan a table QR code, explore your live menu and place orders directly from their phone.",
    color: "text-[#E4572E]",
  },
  {
    number: "02",
    title: "Live Operations",
    description:
      "Orders move instantly from the table to your staff and kitchen, keeping your entire operation connected.",
    color: "text-[#176B4D]",
  },
  {
    number: "03",
    title: "Smart Payments",
    description:
      "Accept cash, eSewa and Khalti while keeping payments and order records organized in one place.",
    color: "text-[#F2B84B]",
  },
  {
    number: "04",
    title: "Owner Dashboard",
    description:
      "Monitor sales, orders, staff activity and menu performance from one simple restaurant dashboard.",
    color: "text-[#176B4D]",
  },
];

export default function Home() {
  return (
    <MarketingLayout>
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#E4572E]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#176B4D]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-6 md:grid-cols-2 md:gap-16 md:pb-28 md:pt-24 lg:px-8">
          {/* Hero copy */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E1D8] bg-white/80 px-4 py-2 text-xs font-semibold text-[#176B4D] shadow-sm backdrop-blur sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#176B4D]" />
              Built for modern restaurants in Nepal
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#17211D] sm:text-5xl md:text-6xl lg:text-7xl">
              Run your restaurant
              <span className="mt-1 block text-[#E4572E]">
                without the chaos.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg md:text-xl md:leading-8">
              QR ordering, payments, kitchen operations, staff management and
              restaurant analytics — all connected in one simple platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/get-started" className="w-full sm:w-auto">
                <Button className="w-full px-7 py-3.5 sm:w-auto">
                  Get Started
                </Button>
              </Link>

              <Link to="/features" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  className="w-full px-7 py-3.5 sm:w-auto"
                >
                  Explore Features
                </Button>
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-8 grid grid-cols-1 gap-3 text-sm text-gray-500 sm:grid-cols-3 sm:gap-5">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#176B4D]/10 text-xs font-bold text-[#176B4D]">
                  ✓
                </span>
                No customer app
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#176B4D]/10 text-xs font-bold text-[#176B4D]">
                  ✓
                </span>
                QR ordering
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#176B4D]/10 text-xs font-bold text-[#176B4D]">
                  ✓
                </span>
                Local payments
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-xl">
            {/* Main image */}
            <div className="relative overflow-hidden rounded-[28px] border border-[#E5E1D8] bg-white p-2 shadow-[0_25px_80px_rgba(23,33,29,0.14)]">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85"
                alt="Restaurant staff using a digital ordering system"
                className="h-[320px] w-full rounded-[22px] object-cover sm:h-[400px]"
              />

              {/* Overlay */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-[#17211D]/90 p-4 text-white shadow-xl backdrop-blur-md sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-300">
                      Today's orders
                    </p>
                    <p className="mt-1 text-2xl font-bold">128</p>
                  </div>

                  <div className="rounded-xl bg-[#E4572E] px-3 py-2 text-xs font-semibold">
                    Live
                  </div>
                </div>
              </div>
            </div>

            {/* Floating order card */}
            <div className="absolute -bottom-5 -left-3 hidden w-48 rounded-2xl border border-[#E5E1D8] bg-white p-4 shadow-xl sm:block md:-left-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">
                  New order
                </span>
                <span className="h-2 w-2 rounded-full bg-[#176B4D]" />
              </div>

              <p className="mt-2 font-semibold text-[#17211D]">
                Table #08
              </p>

              <p className="mt-1 text-xs text-gray-500">
                3 items · Rs. 1,240
              </p>
            </div>

            {/* Floating QR card */}
            <div className="absolute -right-3 -top-5 hidden w-44 rounded-2xl border border-[#E5E1D8] bg-white p-4 shadow-xl sm:block md:-right-8">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#F2B84B]/20 text-sm font-bold text-[#17211D]">
                QR
              </div>

              <p className="text-sm font-semibold text-[#17211D]">
                Scan & order
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                No app download required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================== */}
      <section className="border-y border-[#E5E1D8] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#E5E1D8] px-5 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="px-4 py-8 text-center md:py-10">
            <p className="text-2xl font-bold text-[#17211D] sm:text-3xl">
              1
            </p>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Connected system
            </p>
          </div>

          <div className="px-4 py-8 text-center md:py-10">
            <p className="text-2xl font-bold text-[#17211D] sm:text-3xl">
              24/7
            </p>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Restaurant visibility
            </p>
          </div>

          <div className="border-t border-[#E5E1D8] px-4 py-8 text-center md:border-t-0 md:py-10">
            <p className="text-2xl font-bold text-[#17211D] sm:text-3xl">
              QR
            </p>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Customer ordering
            </p>
          </div>

          <div className="border-t border-[#E5E1D8] px-4 py-8 text-center md:border-t-0 md:py-10">
            <p className="text-2xl font-bold text-[#17211D] sm:text-3xl">
              1
            </p>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Owner dashboard
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================== */}
      <section className="bg-[#FCFAF6]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E4572E] sm:text-sm">
              Everything connected
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[#17211D] sm:text-4xl md:text-5xl">
              One system for your whole restaurant.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              From the moment a customer scans a QR code to the moment the
              kitchen completes the order, everything stays connected.
            </p>
          </div>

          {/* 2x2 on mobile */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.number}
                className="group min-h-[250px] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[290px] sm:p-6"
              >
                <div
                  className={`text-lg font-bold sm:text-2xl ${feature.color}`}
                >
                  {feature.number}
                </div>

                <div className="mt-6 h-px w-10 bg-[#E5E1D8] transition-all duration-300 group-hover:w-16 group-hover:bg-[#E4572E]" />

                <h3 className="mt-5 text-base font-bold text-[#17211D] sm:text-xl">
                  {feature.title}
                </h3>

                <p className="mt-3 text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PRODUCT SECTION
      ========================================================== */}
      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 md:grid-cols-2 md:gap-20 md:py-28 lg:px-8">
          {/* Image */}
          <div className="relative order-2 md:order-1">
            <div className="overflow-hidden rounded-[26px] border border-[#E5E1D8] bg-[#F3EEE5] p-2 shadow-[0_20px_60px_rgba(23,33,29,0.10)]">
              <img
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=85"
                alt="Restaurant payment and ordering experience"
                className="h-[320px] w-full rounded-[20px] object-cover sm:h-[430px]"
              />
            </div>

            <div className="absolute -bottom-5 right-4 rounded-2xl border border-[#E5E1D8] bg-white p-4 shadow-xl sm:right-8">
              <p className="text-xs text-gray-500">Payment status</p>
              <p className="mt-1 text-sm font-bold text-[#176B4D]">
                Payment received
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 md:order-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#176B4D] sm:text-sm">
              Built for daily operations
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-[#17211D] sm:text-4xl md:text-5xl">
              Less manual work.
              <span className="block text-[#E4572E]">
                More control.
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              RestaurantOS connects your customers, staff, kitchen,
              payments and business data so your team can focus on running
              the restaurant instead of managing disconnected systems.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#176B4D]/10 text-sm font-bold text-[#176B4D]">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold text-[#17211D]">
                    Orders stay organized
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Keep customer orders and kitchen workflow connected.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E4572E]/10 text-sm font-bold text-[#E4572E]">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold text-[#17211D]">
                    Payments stay visible
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Track cash and digital payments from one place.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F2B84B]/20 text-sm font-bold text-[#17211D]">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold text-[#17211D]">
                    Owners stay informed
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Understand what is happening across your restaurant.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9">
              <Link to="/features">
                <Button variant="secondary" className="px-6 py-3">
                  See how it works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}
      <section className="px-5 pb-20 sm:px-6 md:pb-28 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#17211D] px-6 py-14 text-white sm:px-10 md:px-14 md:py-20">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#E4572E]/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#176B4D]/20 blur-2xl" />

          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F2B84B] sm:text-sm">
              Ready to modernize?
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] sm:text-4xl md:text-5xl">
              Give your restaurant a better operating system.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
              Start with QR ordering and grow into a complete restaurant
              operations platform designed for modern restaurants in Nepal.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/get-started" className="w-full sm:w-auto">
                <Button className="w-full px-7 py-3.5 sm:w-auto">
                  Get Started
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