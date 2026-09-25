import { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getRestaurant, type Restaurant } from "../../api/restaurant";
import { apiGet } from "../../api/client";

interface ReportSummary {
  total_orders: number;
  paid_revenue: number;
  completed_orders: number;
  average_order: number;
}

function DashboardContent() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [report, setReport] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [restaurantData, reportData] = await Promise.all([
          getRestaurant(),
          apiGet<ReportSummary>("/api/reports/summary"),
        ]);

        setRestaurant(restaurantData);
        setReport(reportData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load dashboard.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#E5E1D8] border-t-[#E4572E]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="mx-auto max-w-2xl p-6">
          <h2 className="text-lg font-bold text-[#17211D]">
            Unable to load dashboard
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-lg bg-[#E4572E] px-4 py-2 text-sm font-semibold text-white"
          >
            Try Again
          </button>
        </Card>
      </div>
    );
  }

  const revenue = Number(report?.paid_revenue ?? 0);
  const averageOrder = Number(report?.average_order ?? 0);

  return (
    <div className="space-y-8 p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-[#E4572E]">
          Overview
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#17211D]">
          {restaurant?.name || "Restaurant Dashboard"}
        </h1>

        <p className="mt-2 text-gray-600">
          Here's what's happening with your restaurant.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <p className="text-sm font-medium text-gray-500">
            Total Orders
          </p>

          <p className="mt-2 text-3xl font-bold text-[#17211D]">
            {report?.total_orders ?? 0}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-medium text-gray-500">
            Paid Revenue
          </p>

          <p className="mt-2 text-3xl font-bold text-[#176B4D]">
            NPR {revenue.toLocaleString()}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-medium text-gray-500">
            Completed Orders
          </p>

          <p className="mt-2 text-3xl font-bold text-[#17211D]">
            {report?.completed_orders ?? 0}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-medium text-gray-500">
            Average Order
          </p>

          <p className="mt-2 text-3xl font-bold text-[#17211D]">
            NPR {averageOrder.toLocaleString()}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#17211D]">
              Restaurant
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your restaurant information comes directly from the API.
            </p>
          </div>

          <Button
            type="button"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Name
            </p>
            <p className="mt-1 font-medium text-[#17211D]">
              {restaurant?.name || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Phone
            </p>
            <p className="mt-1 font-medium text-[#17211D]">
              {restaurant?.phone || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              City
            </p>
            <p className="mt-1 font-medium text-[#17211D]">
              {restaurant?.city || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Address
            </p>
            <p className="mt-1 font-medium text-[#17211D]">
              {restaurant?.address || "—"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AppLayout>
      <DashboardContent />
    </AppLayout>
  );
}