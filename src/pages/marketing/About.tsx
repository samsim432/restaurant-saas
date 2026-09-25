import { Link } from "react-router-dom";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function About() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="border-b border-[#E5E1D8]">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
              About RestaurantOS
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-[#17211D] md:text-7xl">
              Restaurant software should
              <span className="block text-[#E4572E]">
                make work simpler.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
              RestaurantOS is a restaurant management platform designed to
              connect ordering, payments and daily restaurant operations in
              one simple system.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
                Our mission
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#17211D] md:text-5xl">
                Help restaurants spend less time managing tools.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-gray-600">
              <p>
                Running a restaurant already involves enough moving parts.
                Orders, tables, payments, staff and kitchen operations should
                not require a collection of disconnected systems.
              </p>

              <p>
                RestaurantOS brings those workflows together so restaurant
                owners and staff can focus on serving customers instead of
                constantly switching between tools.
              </p>

              <p>
                We are building the platform around real restaurant
                operations, starting with the everyday workflows that matter
                most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-y border-[#E5E1D8] bg-[#FCFAF6]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
              The problem
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#17211D] md:text-5xl">
              Restaurant operations can become unnecessarily complicated.
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Different tools for menus, orders, payments and reporting can
              create more work for owners and staff.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Card className="p-7">
              <div className="text-3xl font-bold text-[#E4572E]">01</div>

              <h3 className="mt-6 text-xl font-bold text-[#17211D]">
                Disconnected systems
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Important restaurant information can end up spread across
                different tools and workflows.
              </p>
            </Card>

            <Card className="p-7">
              <div className="text-3xl font-bold text-[#176B4D]">02</div>

              <h3 className="mt-6 text-xl font-bold text-[#17211D]">
                Manual processes
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Repeating the same operational tasks takes valuable time
                away from restaurant teams.
              </p>
            </Card>

            <Card className="p-7">
              <div className="text-3xl font-bold text-[#F2B84B]">03</div>

              <h3 className="mt-6 text-xl font-bold text-[#17211D]">
                Limited visibility
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Owners need a clear view of orders, payments and restaurant
                performance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How we build */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
                How we build
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#17211D] md:text-5xl">
                Simple for customers. Powerful for restaurants.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                The customer experience should stay simple while the
                restaurant gets the operational tools it needs behind the
                scenes.
              </p>

              <div className="mt-8">
                <Link to="/features">
                  <Button variant="secondary">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {[
                [
                  "Customer first",
                  "Customers can order from their phone without creating an account or installing an app.",
                ],
                [
                  "Operations focused",
                  "Staff get a clear workflow for orders, payments and kitchen operations.",
                ],
                [
                  "Owner control",
                  "Owners get visibility into restaurant performance and operational activity.",
                ],
                [
                  "Built to grow",
                  "The platform can expand from simple QR ordering into a complete restaurant operating system.",
                ],
              ].map(([title, description], index) => (
                <Card key={title} className="p-6">
                  <div className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#17211D] text-xs font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="font-bold text-[#17211D]">
                        {title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-[#E5E1D8] bg-[#FCFAF6]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
              What matters to us
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#17211D] md:text-5xl">
              Built with practical principles.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Card className="p-7">
              <h3 className="text-xl font-bold text-[#17211D]">
                Simple
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Restaurant teams should be able to understand the software
                without needing technical training.
              </p>
            </Card>

            <Card className="p-7">
              <h3 className="text-xl font-bold text-[#17211D]">
                Reliable
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Orders and payments are operationally important, so the
                system should be designed around reliable workflows.
              </p>
            </Card>

            <Card className="p-7">
              <h3 className="text-xl font-bold text-[#17211D]">
                Practical
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Every feature should solve a real restaurant problem rather
                than simply adding complexity.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="rounded-2xl bg-[#17211D] px-8 py-12 text-white md:px-14 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F2B84B]">
            Start building better operations
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
            Give your restaurant a simpler way to operate.
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-gray-300">
            Explore the platform and see how QR ordering, payments and
            restaurant operations can work together.
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