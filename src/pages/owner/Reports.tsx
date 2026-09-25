import AppLayout from "../../layouts/AppLayout";
import Card from "../../components/ui/Card";

const dailySales = [
  { day: "Mon", amount: 32400 },
  { day: "Tue", amount: 38200 },
  { day: "Wed", amount: 35600 },
  { day: "Thu", amount: 42100 },
  { day: "Fri", amount: 46800 },
  { day: "Sat", amount: 52400 },
  { day: "Sun", amount: 42800 },
];

const topItems = [
  {
    name: "Chicken Momo",
    orders: 84,
    revenue: 15120,
  },
  {
    name: "Thakali Set",
    orders: 62,
    revenue: 27900,
  },
  {
    name: "Chicken Chowmein",
    orders: 51,
    revenue: 11220,
  },
  {
    name: "Buff Momo",
    orders: 48,
    revenue: 7680,
  },
];

export default function Reports() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <p className="text-sm font-semibold text-[#E4572E]">
          Analytics
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#17211D]">
          Reports
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Understand sales, orders and menu performance.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Weekly revenue
            </p>

            <p className="mt-2 text-2xl font-bold">
              NPR 290,300
            </p>

            <p className="mt-2 text-xs text-[#176B4D]">
              +14.8% vs previous week
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Orders
            </p>

            <p className="mt-2 text-2xl font-bold">
              864
            </p>

            <p className="mt-2 text-xs text-[#176B4D]">
              +9.2% vs previous week
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Average order
            </p>

            <p className="mt-2 text-2xl font-bold">
              NPR 336
            </p>

            <p className="mt-2 text-xs text-[#176B4D]">
              +3.1% vs previous week
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Customers
            </p>

            <p className="mt-2 text-2xl font-bold">
              712
            </p>

            <p className="mt-2 text-xs text-[#176B4D]">
              +11.4% vs previous week
            </p>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <Card className="p-6">
            <div>
              <h2 className="font-semibold text-[#17211D]">
                Daily revenue
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Revenue for the current week
              </p>
            </div>

            <div className="mt-8 flex h-64 items-end gap-3">
              {dailySales.map((item) => {
                const height =
                  (item.amount / 60000) * 100;

                return (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div className="text-xs font-semibold text-gray-500">
                      {(item.amount / 1000).toFixed(0)}k
                    </div>

                    <div
                      className="w-full max-w-10 rounded-t-lg bg-[#E4572E]"
                      style={{
                        height: `${height}%`,
                      }}
                    />

                    <div className="text-xs text-gray-500">
                      {item.day}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold text-[#17211D]">
              Top menu items
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Based on orders this week
            </p>

            <div className="mt-6 space-y-5">
              {topItems.map((item, index) => (
                <div key={item.name}>
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#17211D]">
                        {index + 1}. {item.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.orders} orders
                      </p>
                    </div>

                    <p className="text-sm font-semibold">
                      NPR {item.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="mt-8 overflow-hidden">
          <div className="border-b border-[#E5E1D8] px-6 py-5">
            <h2 className="font-semibold text-[#17211D]">
              Payment breakdown
            </h2>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">
                eSewa
              </p>

              <p className="mt-2 text-xl font-bold">
                NPR 98,450
              </p>

              <div className="mt-3 h-2 rounded-full bg-[#F7F5F0]">
                <div
                  className="h-2 rounded-full bg-[#176B4D]"
                  style={{ width: "58%" }}
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Khalti
              </p>

              <p className="mt-2 text-xl font-bold">
                NPR 54,220
              </p>

              <div className="mt-3 h-2 rounded-full bg-[#F7F5F0]">
                <div
                  className="h-2 rounded-full bg-[#E4572E]"
                  style={{ width: "32%" }}
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Cash
              </p>

              <p className="mt-2 text-xl font-bold">
                NPR 38,630
              </p>

              <div className="mt-3 h-2 rounded-full bg-[#F7F5F0]">
                <div
                  className="h-2 rounded-full bg-[#F2B84B]"
                  style={{ width: "23%" }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}