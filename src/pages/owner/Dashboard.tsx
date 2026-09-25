import { Link } from "react-router-dom";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function Dashboard() {
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E4572E]">
            Restaurant dashboard
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#17211D] md:text-6xl">
            Your restaurant workspace.
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            The operational dashboard will be built in the next frontend
            phase.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {[
            ["Today's orders", "128"],
            ["Revenue", "NPR 42,800"],
            ["Preparing", "12"],
            ["Tables", "24"],
          ].map(([label, value]) => (
            <Card key={label} className="p-6">
              <p className="text-sm text-gray-500">{label}</p>

              <p className="mt-3 text-2xl font-bold text-[#17211D]">
                {value}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/">
            <Button variant="secondary">
              Back to Website
            </Button>
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}