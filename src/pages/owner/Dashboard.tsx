import { Link } from "react-router-dom";

import AppLayout from "../../layouts/AppLayout";
import Card from "../../components/ui/Card";

const stats = [
  {
    label: "Today's revenue",
    value: "NPR 42,800",
    detail: "+12.5% from yesterday",
  },
  {
    label: "Today's orders",
    value: "128",
    detail: "+8 orders from yesterday",
  },
  {
    label: "Active tables",
    value: "18 / 24",
    detail: "6 tables available",
  },
  {
    label: "Average order",
    value: "NPR 334",
    detail: "+4.2% this week",
  },
];

const recentOrders = [
  {
    number: "#1048",
    table: "Table 08",
    items: "2 items",
    amount: "NPR 850",
    status: "Paid",
  },
  {
    number: "#1047",
    table: "Table 03",
    items: "4 items",
    amount: "NPR 1,240",
    status: "Preparing",
  },
  {
    number: "#1046",
    table: "Table 12",
    items: "3 items",
    amount: "NPR 720",
    status: "Ready",
  },
  {
    number: "#1045",
    table: "Table 05",
    items: "5 items",
    amount: "NPR 1,560",
    status: "Completed",
  },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#E4572E]">
              Overview
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17211D] sm:text-3xl">
              Good morning.
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Here's what's happening at your restaurant today.
            </p>
          </div>

          <Link
            to="/dashboard/orders"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#E4572E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#CF4D28] focus:outline-none focus:ring-2 focus:ring-[#E4572E] focus:ring-offset-2 sm:w-auto"
          >
            View Live Orders
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="min-w-0 p-4 sm:p-6">
              <p className="text-sm text-gray-500">{stat.label}</p>

              <p className="mt-2 break-words text-xl font-bold tracking-tight text-[#17211D] sm:mt-3 sm:text-2xl">
                {stat.value}
              </p>

              <p className="mt-2 text-xs leading-5 text-[#176B4D]">
                {stat.detail}
              </p>
            </Card>
          ))}
        </div>

        {/* Main dashboard content */}
        <div className="mt-6 grid min-w-0 gap-5 sm:mt-8 sm:gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">
          {/* Recent orders */}
          <Card className="min-w-0 overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-[#E5E1D8] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
              <div className="min-w-0">
                <h2 className="font-semibold text-[#17211D]">
                  Recent orders
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Latest activity from your restaurant
                </p>
              </div>

              <Link
                to="/dashboard/orders"
                className="inline-flex min-h-10 w-fit items-center text-sm font-semibold text-[#E4572E] hover:underline focus:outline-none focus:ring-2 focus:ring-[#E4572E] focus:ring-offset-2"
              >
                View all
              </Link>
            </div>

            <div className="divide-y divide-[#E5E1D8]">
              {recentOrders.map((order) => (
                <div
                  key={order.number}
                  className="flex min-w-0 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5"
                >
                  <div className="min-w-0">
                    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="font-semibold text-[#17211D]">
                        {order.number}
                      </p>

                      <span className="text-xs text-gray-400">
                        {order.table}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {order.items}
                    </p>
                  </div>

                  <div className="flex min-w-0 items-center justify-between gap-3 sm:justify-end sm:gap-5">
                    <p className="min-w-0 break-words text-sm font-semibold text-[#17211D]">
                      {order.amount}
                    </p>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        order.status === "Paid"
                          ? "bg-green-50 text-[#176B4D]"
                          : order.status === "Preparing"
                            ? "bg-orange-50 text-[#E4572E]"
                            : order.status === "Ready"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick actions */}
          <Card className="min-w-0">
            <div className="border-b border-[#E5E1D8] px-4 py-4 sm:px-6 sm:py-5">
              <h2 className="font-semibold text-[#17211D]">
                Quick actions
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Common restaurant tasks
              </p>
            </div>

            <div className="grid gap-3 p-4 sm:p-6">
              <Link
                to="/dashboard/tables"
                className="block min-w-0 rounded-lg border border-[#E5E1D8] p-4 transition hover:border-[#E4572E] hover:bg-[#FFF9F6] focus:outline-none focus:ring-2 focus:ring-[#E4572E] focus:ring-offset-2"
              >
                <p className="font-semibold text-[#17211D]">
                  Manage tables
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Create tables and generate QR codes
                </p>
              </Link>

              <Link
                to="/dashboard/menu"
                className="block min-w-0 rounded-lg border border-[#E5E1D8] p-4 transition hover:border-[#E4572E] hover:bg-[#FFF9F6] focus:outline-none focus:ring-2 focus:ring-[#E4572E] focus:ring-offset-2"
              >
                <p className="font-semibold text-[#17211D]">
                  Manage menu
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Add items and control availability
                </p>
              </Link>

              <Link
                to="/dashboard/staff"
                className="block min-w-0 rounded-lg border border-[#E5E1D8] p-4 transition hover:border-[#E4572E] hover:bg-[#FFF9F6] focus:outline-none focus:ring-2 focus:ring-[#E4572E] focus:ring-offset-2"
              >
                <p className="font-semibold text-[#17211D]">
                  Manage staff
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Add staff and manage access
                </p>
              </Link>
            </div>
          </Card>
        </div>

        {/* Setup progress */}
        <div className="mt-6 overflow-hidden rounded-xl border border-[#E5E1D8] bg-[#17211D] p-5 text-white sm:mt-8 sm:p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#F2B84B]">
                Setup progress
              </p>

              <h2 className="mt-2 text-lg font-bold sm:text-xl">
                Your restaurant is 25% ready.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                Add your tables and menu items to start accepting QR
                orders.
              </p>
            </div>

            <Link
              to="/dashboard/tables"
              className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-lg bg-[#E4572E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#CF4D28] focus:outline-none focus:ring-2 focus:ring-[#E4572E] focus:ring-offset-2 focus:ring-offset-[#17211D] sm:w-auto"
            >
              Continue Setup
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}