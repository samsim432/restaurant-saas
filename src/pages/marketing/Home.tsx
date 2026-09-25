import { Link } from "react-router-dom";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function Home() {
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-[#E5E1D8] bg-white px-4 py-2 text-sm font-medium text-[#176B4D]">
            Built for modern restaurants in Nepal
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-[#17211D] md:text-7xl">
            Run your restaurant
            <span className="block text-[#E4572E]">
              without the chaos.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
            QR ordering, cash and online payments, live kitchen orders,
            staff management and restaurant analytics — all in one simple
            platform.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/get-started">
              <Button className="px-7 py-3.5">
                Get Started
              </Button>
            </Link>

            <Link to="/features">
              <Button variant="secondary" className="px-7 py-3.5">
                Explore Features
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">
            <span>✓ No customer app</span>
            <span>✓ QR ordering</span>
            <span>✓ Cash + eSewa + Khalti</span>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E5E1D8] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#E4572E]">
              Everything connected
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#17211D] md:text-5xl">
              One system for your whole restaurant.
            </h2>

            <p className="mt-5 text-gray-600">
              From the moment a customer scans a QR code to the moment the
              kitchen completes the order, everything stays connected.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Card className="p-6">
              <div className="text-2xl">01</div>

              <h3 className="mt-5 text-xl font-semibold text-[#17211D]">
                QR Ordering
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Customers scan a table QR, browse your live menu and order
                directly from their phone.
              </p>
            </Card>

            <Card className="p-6">
              <div className="text-2xl text-[#176B4D]">02</div>

              <h3 className="mt-5 text-xl font-semibold text-[#17211D]">
                Live Operations
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Staff receive orders instantly and manage payment,
                preparation and table workflow from one dashboard.
              </p>
            </Card>

            <Card className="p-6">
              <div className="text-2xl text-[#F2B84B]">03</div>

              <h3 className="mt-5 text-xl font-semibold text-[#17211D]">
                Owner Control
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                See sales, staff activity, menu performance, payments and
                restaurant operations in one place.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="rounded-2xl bg-[#17211D] px-8 py-12 text-white md:px-14 md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#F2B84B]">
              Ready to modernize?
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Give your restaurant a better operating system.
            </h2>

            <p className="mt-5 leading-7 text-gray-300">
              Start with QR ordering and grow into a complete restaurant
              operations platform.
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
