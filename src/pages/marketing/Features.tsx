import { Link } from "react-router-dom";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const features = [
  {
    number: "01",
    title: "QR Ordering",
    description:
      "Customers scan a table QR code, browse your live menu and place orders directly from their phones.",
    points: [
      "Table-specific QR codes",
      "Mobile-first menu",
      "No customer app required",
    ],
  },
  {
    number: "02",
    title: "Live Orders",
    description:
      "Give your kitchen and staff one clear view of every order from the moment it arrives until it is completed.",
    points: [
      "Real-time order workflow",
      "Order status tracking",
      "Table and order information",
    ],
  },
  {
    number: "03",
    title: "Payments",
    description:
      "Handle cash and digital payments in one system while keeping payment status separate from order status.",
    points: [
      "Cash payments",
      "eSewa integration",
      "Khalti integration",
    ],
  },
  {
    number: "04",
    title: "Menu Management",
    description:
      "Manage categories, dishes, prices and availability without rebuilding your menu every time something changes.",
    points: [
      "Categories and menu items",
      "Price management",
      "Sold-out controls",
    ],
  },
  {
    number: "05",
    title: "Tables & QR Codes",
    description:
      "Create restaurant tables and generate permanent QR codes that customers can scan whenever they visit.",
    points: [
      "Unlimited table structure",
      "Secure table tokens",
      "Easy QR management",
    ],
  },
  {
    number: "06",
    title: "Staff Management",
    description:
      "Give your team the tools they need while keeping restaurant operations and sensitive settings under owner control.",
    points: [
      "Staff accounts",
      "Role-based access",
      "Activity tracking",
    ],
  },
  {
    number: "07",
    title: "Restaurant Analytics",
    description:
      "Understand how your restaurant is performing with simple reports covering orders, revenue and popular items.",
    points: [
      "Daily revenue",
      "Order statistics",
      "Popular menu items",
    ],
  },
  {
    number: "08",
    title: "Thermal Printing",
    description:
      "Automatically send eligible paid orders to your restaurant printer and keep manual reprinting available when needed.",
    points: [
      "Automatic printing",
      "Manual reprint",
      "Print job tracking",
    ],
  },
];

export default function Features() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="border-b border-[#E5E1D8]">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
              Restaurant management platform
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-[#17211D] md:text-7xl">
              Everything your restaurant
              <span className="block text-[#E4572E]">
                needs to run better.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
              From QR ordering and payments to live kitchen operations and
              analytics, RestaurantOS connects the important parts of your
              restaurant in one simple platform.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/get-started">
                <Button className="px-7 py-3.5">
                  Get Started
                </Button>
              </Link>

              <Link to="/pricing">
                <Button variant="secondary" className="px-7 py-3.5">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature overview */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
              One platform
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#17211D] md:text-5xl">
              Built around how restaurants actually work.
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Keep ordering, payments, kitchen operations and management
              connected instead of relying on multiple disconnected tools.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {features.map((feature) => (
              <Card
                key={feature.number}
                className="p-7 transition-transform duration-200 hover:-translate-y-1 md:p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="text-sm font-bold text-[#E4572E]">
                    {feature.number}
                  </span>

                  <span className="rounded-full border border-[#E5E1D8] bg-[#FCFAF6] px-3 py-1 text-xs font-semibold text-[#176B4D]">
                    Included
                  </span>
                </div>

                <h3 className="mt-7 text-2xl font-bold text-[#17211D]">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {feature.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 text-sm font-medium text-[#17211D]"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#176B4D]/10 text-xs font-bold text-[#176B4D]">
                        ✓
                      </span>

                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Operations section */}
      <section className="border-y border-[#E5E1D8] bg-[#FCFAF6]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
                Connected operations
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#17211D] md:text-5xl">
                From customer order to kitchen completion.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Every order follows a clear workflow so your staff can spend
                less time managing systems and more time serving customers.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  ["01", "Customer orders", "A customer scans the table QR and places an order."],
                  ["02", "Payment confirmed", "Cash or online payment is recorded separately."],
                  ["03", "Kitchen prepares", "Staff move the order through the kitchen workflow."],
                  ["04", "Order completed", "The order is completed and included in reporting."],
                ].map(([number, title, description]) => (
                  <div key={number} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#17211D] text-xs font-bold text-white">
                      {number}
                    </span>

                    <div>
                      <h3 className="font-semibold text-[#17211D]">
                        {title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-7 md:p-9">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-5">
                <div>
                  <p className="text-sm text-gray-500">
                    Today's Orders
                  </p>

                  <p className="mt-1 text-4xl font-bold text-[#17211D]">
                    128
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-[#176B4D]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#176B4D]" />
                  Live
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  ["New Orders", "24", "bg-[#E4572E]"],
                  ["Preparing", "12", "bg-[#F2B84B]"],
                  ["Ready", "8", "bg-[#176B4D]"],
                  ["Completed", "84", "bg-gray-400"],
                ].map(([label, count, color]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-[#E5E1D8] pb-4"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${color}`}
                      />

                      <span className="text-sm font-medium text-gray-600">
                        {label}
                      </span>
                    </div>

                    <span className="font-bold text-[#17211D]">
                      {count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-lg bg-[#F7F5F0] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Payment status
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#17211D]">
                    Paid orders
                  </span>

                  <span className="font-bold text-[#176B4D]">
                    104
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="rounded-2xl bg-[#17211D] px-8 py-12 text-white md:px-14 md:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F2B84B]">
              Ready to get started?
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Give your restaurant one system for everything.
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-gray-300">
              Start with QR ordering and build a more connected restaurant
              operation around it.
            </p>

            <div className="mt-8">
              <Link to="/get-started">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}