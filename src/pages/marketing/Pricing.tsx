import { Link } from "react-router-dom";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const plans = [
  {
    name: "Starter",
    description:
      "For small restaurants getting started with digital ordering.",
    price: "1,999",
    popular: false,
    features: [
      "QR table ordering",
      "Digital menu",
      "Table management",
      "Cash payments",
      "Basic order dashboard",
      "Basic reports",
    ],
  },
  {
    name: "Growth",
    description:
      "For growing restaurants that need complete daily operations.",
    price: "3,999",
    popular: true,
    features: [
      "Everything in Starter",
      "eSewa + Khalti payments",
      "Live order dashboard",
      "Staff accounts",
      "Thermal printing",
      "Sales analytics",
      "Advanced reports",
      "Priority support",
    ],
  },
  {
    name: "Professional",
    description:
      "For busy restaurants that need deeper operational control.",
    price: "6,999",
    popular: false,
    features: [
      "Everything in Growth",
      "Advanced inventory",
      "Multiple printers",
      "Advanced staff roles",
      "Cash shift management",
      "Detailed audit logs",
      "Advanced analytics",
      "Dedicated support",
    ],
  },
];

const includedFeatures = [
  {
    title: "QR Ordering",
    description:
      "Let customers order directly from their table using their phone.",
  },
  {
    title: "Live Orders",
    description:
      "Keep your restaurant staff and kitchen operations connected.",
  },
  {
    title: "Payments",
    description:
      "Manage cash and supported digital payment workflows in one place.",
  },
  {
    title: "Reports",
    description:
      "Understand sales, orders and overall restaurant performance.",
  },
];

const faqs = [
  {
    question: "Do customers need to install an app?",
    answer:
      "No. Customers simply scan your restaurant's QR code and use the mobile website. No customer account or app is required.",
  },
  {
    question: "Can customers pay with cash?",
    answer:
      "Yes. Cash orders are supported. Staff can confirm payment at the restaurant before the order moves into the paid workflow.",
  },
  {
    question: "Do you support eSewa and Khalti?",
    answer:
      "The platform is designed to support eSewa and Khalti through server-side payment verification.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes. Your restaurant can move between plans as your operational requirements change.",
  },
  {
    question: "Do I need special hardware?",
    answer:
      "QR ordering works with standard smartphones. Thermal printing is optional and can be added when your restaurant is ready.",
  },
];

export default function Pricing() {
  return (
    <MarketingLayout>
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden border-b border-[#E5E1D8] bg-[#FCFAF6]">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#E4572E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 text-center sm:px-6 md:pb-24 md:pt-24 lg:px-8">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-semibold text-[#176B4D] shadow-sm sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#176B4D]" />
            Simple & transparent pricing
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#17211D] sm:text-5xl md:text-6xl lg:text-7xl">
            Choose the tools your
            <span className="block text-[#E4572E]">
              restaurant needs.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg md:text-xl md:leading-8">
            Start with the essentials and add more operational tools as your
            restaurant grows.
          </p>

          {/* Small trust row */}
          <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-gray-500 sm:text-sm">
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
              Local payment support
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRICING CARDS
      ========================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex h-full flex-col overflow-hidden p-5 sm:p-7 ${
                  plan.popular
                    ? "border-2 border-[#E4572E] shadow-[0_20px_60px_rgba(228,87,46,0.12)]"
                    : "border-[#E5E1D8]"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute inset-x-0 top-0 bg-[#E4572E] px-4 py-2 text-center text-xs font-bold uppercase tracking-wider text-white">
                    Most popular
                  </div>
                )}

                <div className={plan.popular ? "pt-7" : ""}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#176B4D]">
                        {plan.name}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-[#17211D] sm:text-3xl">
                        {plan.name}
                      </h2>
                    </div>

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        plan.popular
                          ? "bg-[#E4572E]/10 text-[#E4572E]"
                          : "bg-[#F3EEE5] text-[#17211D]"
                      }`}
                    >
                      <span className="text-sm font-bold">
                        {plan.name === "Starter"
                          ? "01"
                          : plan.name === "Growth"
                            ? "02"
                            : "03"}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 min-h-[70px] text-sm leading-6 text-gray-600">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-6 border-y border-[#E5E1D8] py-6">
                  <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                    <span className="text-3xl font-bold tracking-tight text-[#17211D] sm:text-4xl">
                      NPR {plan.price}
                    </span>

                    <span className="pb-1 text-xs text-gray-500 sm:text-sm">
                      / month
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    Restaurant subscription
                  </p>
                </div>

                {/* Features */}
                <div className="mt-7 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#17211D]">
                    What's included
                  </p>

                  <ul className="mt-5 space-y-3.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-[#17211D]"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#176B4D]/10 text-[10px] font-bold text-[#176B4D]">
                          ✓
                        </span>

                        <span className="leading-5">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link to="/get-started" className="mt-8 block">
                  <Button
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full py-3.5"
                  >
                    Get Started
                  </Button>
                </Link>

                <p className="mt-3 text-center text-[11px] text-gray-400">
                  Set up your restaurant in simple steps
                </p>
              </Card>
            ))}
          </div>

          {/* Pricing note */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#176B4D]/10 text-xs font-bold text-[#176B4D]">
              ✓
            </span>

            <p className="text-xs leading-5 text-gray-500 sm:text-sm">
              Choose the plan that matches your restaurant's current
              operational needs.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          INCLUDED FEATURES
      ========================================================== */}
      <section className="border-y border-[#E5E1D8] bg-[#FCFAF6]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E4572E] sm:text-sm">
              Restaurant essentials
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[#17211D] sm:text-4xl md:text-5xl">
              Built around the essentials.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Every plan is built around the core restaurant workflow,
              while higher plans add deeper operational tools.
            </p>
          </div>

          {/* 2x2 on mobile */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {includedFeatures.map((feature, index) => (
              <Card
                key={feature.title}
                className="group min-h-[210px] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[230px] sm:p-6"
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold sm:h-10 sm:w-10 ${
                    index === 0
                      ? "bg-[#E4572E]/10 text-[#E4572E]"
                      : index === 1
                        ? "bg-[#176B4D]/10 text-[#176B4D]"
                        : index === 2
                          ? "bg-[#F2B84B]/20 text-[#17211D]"
                          : "bg-[#E4572E]/10 text-[#E4572E]"
                  }`}
                >
                  0{index + 1}
                </div>

                <h3 className="mt-5 text-sm font-bold text-[#17211D] sm:text-base">
                  {feature.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-6 md:py-28">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E4572E] sm:text-sm">
              FAQ
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[#17211D] sm:text-4xl md:text-5xl">
              Common questions.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
              Everything you may want to know before setting up RestaurantOS.
            </p>
          </div>

          <div className="mt-10 space-y-3 sm:mt-12 sm:space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={faq.question}
                className="p-5 sm:p-6 md:p-7"
              >
                <div className="flex gap-4">
                  <span className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F3EEE5] text-[10px] font-bold text-[#17211D] sm:flex">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-sm font-bold leading-6 text-[#17211D] sm:text-base">
                      {faq.question}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600 sm:mt-3 sm:leading-7">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="px-5 pb-20 sm:px-6 md:pb-28 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#17211D] px-6 py-14 text-white sm:px-10 md:px-14 md:py-20">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#E4572E]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#176B4D]/20 blur-3xl" />

          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F2B84B] sm:text-sm">
              Get started
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl md:text-5xl">
              Ready to simplify your restaurant operations?
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
              Choose your plan, set up your restaurant and start building a
              better ordering experience for your customers.
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