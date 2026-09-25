import { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  getReportSummary,
  type ReportSummary,
} from "../../api/reports";

export default function Reports() {
  const [report, setReport] =
    useState<ReportSummary | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadReport() {
    try {
      setLoading(true);
      setError("");

      const data = await getReportSummary();
      setReport(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load reports.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReport();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading reports...
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#E4572E]">
              Analytics
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#17211D]">
              Reports
            </h1>

            <p className="mt-2 text-gray-600">
              Restaurant performance from your real order data.
            </p>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={loadReport}
          >
            Refresh
          </Button>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </Card>
        )}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="p-6">
            <p className="text-sm font-medium text-gray-500">
              Total Orders
            </p>

            <p className="mt-3 text-3xl font-bold text-[#17211D]">
              {report?.total_orders ?? 0}
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-medium text-gray-500">
              Paid Revenue
            </p>

            <p className="mt-3 text-3xl font-bold text-[#176B4D]">
              NPR{" "}
              {Number(
                report?.paid_revenue ?? 0,
              ).toLocaleString()}
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-medium text-gray-500">
              Completed Orders
            </p>

            <p className="mt-3 text-3xl font-bold text-[#17211D]">
              {report?.completed_orders ?? 0}
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-medium text-gray-500">
              Average Order
            </p>

            <p className="mt-3 text-3xl font-bold text-[#17211D]">
              NPR{" "}
              {Number(
                report?.average_order ?? 0,
              ).toLocaleString()}
            </p>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="text-xl font-bold text-[#17211D]">
            Current Performance
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            These numbers are calculated by the RestaurantOS
            backend from your restaurant's orders and payments.
          </p>

          <div className="mt-6 rounded-lg bg-[#FCFAF6] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Order completion
              </span>

              <span className="font-bold text-[#17211D]">
                {report?.total_orders
                  ? Math.round(
                      (report.completed_orders /
                        report.total_orders) *
                        100,
                    )
                  : 0}
                %
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E5E1D8]">
              <div
                className="h-full rounded-full bg-[#176B4D]"
                style={{
                  width: `${
                    report?.total_orders
                      ? Math.min(
                          100,
                          (report.completed_orders /
                            report.total_orders) *
                            100,
                        )
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}