import { Link } from "react-router-dom";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const plans = [
  {
    name: "Starter",
    description: "For small restaurants getting started with digital ordering.",
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
    description: "For growing restaurants that need complete daily operations.",
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
    description: "For busy restaurants that need deeper operational control.",
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

const faqs = [
  {
    question: "Do customers need to install an app?",
    answer:
      "No. Customers simply scan the restaurant's QR code and use the mobile website. No customer account or app is required.",
  },
  {
    question: "Can customers pay with cash?",
    answer:
      "Yes. Cash orders are supported. Staff can confirm the payment at the restaurant before the order moves into the paid workflow.",
  },
  {
    question: "Do you support eSewa and Khalti?",
    answer:
      "The platform is designed to support both eSewa and Khalti through server-side payment verification.",
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
      {/* Hero */}
      <section className="border-b border-[#E5E1D8]">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 text-center md:pb-28 md:pt-28">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
            Simple pricing
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-[#17211D] md:text-7xl">
            Choose the tools your
            <span className="block text-[#E4572E]">
              restaurant needs.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
            Start small, then add more operational tools as your restaurant
            grows.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col p-7 md:p-8 ${
                  plan.popular
                    ? "border-2 border-[#E4572E]"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-6 top-6 rounded-full bg-[#E4572E] px-3 py-1 text-xs font-bold text-white">
                    Most popular
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold text-[#17211D]">
                    {plan.name}
                  </h2>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-600">
                    {plan.description}
                  </p>
                </div>

                <div className="mt-7 border-y border-[#E5E1D8] py-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-[#17211D]">
                      NPR {plan.price}
                    </span>

                    <span className="pb-1 text-sm text-gray-500">
                      / month
                    </span>
                  </div>
                </div>

                <ul className="mt-7 flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-[#17211D]"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#176B4D]/10 text-xs font-bold text-[#176B4D]">
                        ✓
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/get-started" className="mt-8 block">
                  <Button
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="border-y border-[#E5E1D8] bg-[#FCFAF6]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
              Every restaurant
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#17211D] md:text-5xl">
              Built around the essentials.
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Every plan is designed around the core restaurant workflow,
              while higher plans add deeper operational tools.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["QR Ordering", "Let customers order directly from their table."],
              ["Live Orders", "Keep staff and kitchen operations connected."],
              ["Payments", "Manage cash and digital payment workflows."],
              ["Reports", "Understand sales and restaurant performance."],
            ].map(([title, description]) => (
              <Card key={title} className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E4572E]/10 text-sm font-bold text-[#E4572E]">
                  ✓
                </div>

                <h3 className="mt-5 font-bold text-[#17211D]">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
              FAQ
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#17211D] md:text-5xl">
              Common questions.
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.question} className="p-6">
                <h3 className="font-bold text-[#17211D]">
                  {faq.question}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:pb-28">
        <div className="rounded-2xl bg-[#17211D] px-8 py-12 text-white md:px-14 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F2B84B]">
            Get started
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
            Ready to simplify your restaurant operations?
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-gray-300">
            Set up your restaurant and start building a better ordering
            experience for your customers.
          </p>

          <div className="mt-8">
            <Link to="/get-started">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}