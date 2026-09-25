import { useMemo, useState } from "react";

import AppLayout from "../../layouts/AppLayout";
import Card from "../../components/ui/Card";

type OrderStatus =
  | "New"
  | "Preparing"
  | "Ready"
  | "Completed"
  | "Cancelled";

interface Order {
  id: number;
  number: string;
  table: string;
  items: string;
  amount: number;
  payment: "Cash" | "eSewa" | "Khalti";
  status: OrderStatus;
  time: string;
}

const initialOrders: Order[] = [
  {
    id: 1,
    number: "#1048",
    table: "Table 08",
    items: "Momo × 2, Coke × 2",
    amount: 850,
    payment: "eSewa",
    status: "New",
    time: "2 min ago",
  },
  {
    id: 2,
    number: "#1047",
    table: "Table 03",
    items: "Chicken Sekuwa, Rice, Coke",
    amount: 1240,
    payment: "Khalti",
    status: "Preparing",
    time: "8 min ago",
  },
  {
    id: 3,
    number: "#1046",
    table: "Table 12",
    items: "Momo × 1, Chowmein × 1",
    amount: 720,
    payment: "Cash",
    status: "Ready",
    time: "12 min ago",
  },
  {
    id: 4,
    number: "#1045",
    table: "Table 05",
    items: "Thakali Set × 2",
    amount: 1560,
    payment: "eSewa",
    status: "Completed",
    time: "25 min ago",
  },
  {
    id: 5,
    number: "#1044",
    table: "Table 02",
    items: "Burger × 2, Fries × 2",
    amount: 980,
    payment: "Cash",
    status: "Completed",
    time: "31 min ago",
  },
];

const statuses: Array<"All" | OrderStatus> = [
  "All",
  "New",
  "Preparing",
  "Ready",
  "Completed",
  "Cancelled",
];

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] =
    useState<"All" | OrderStatus>("All");

  const filteredOrders = useMemo(() => {
    if (filter === "All") {
      return orders;
    }

    return orders.filter((order) => order.status === filter);
  }, [orders, filter]);

  function updateStatus(id: number, status: OrderStatus) {
    setOrders((current) =>
      current.map((order) =>
        order.id === id
          ? { ...order, status }
          : order,
      ),
    );
  }

  function statusClass(status: OrderStatus) {
    switch (status) {
      case "New":
        return "bg-blue-50 text-blue-700";

      case "Preparing":
        return "bg-orange-50 text-[#E4572E]";

      case "Ready":
        return "bg-yellow-50 text-yellow-700";

      case "Completed":
        return "bg-green-50 text-[#176B4D]";

      case "Cancelled":
        return "bg-red-50 text-red-600";
    }
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div>
          <p className="text-sm font-semibold text-[#E4572E]">
            Operations
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#17211D]">
            Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Monitor and manage restaurant orders in real time.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <p className="text-sm text-gray-500">New</p>
            <p className="mt-2 text-2xl font-bold text-[#17211D]">
              {orders.filter((o) => o.status === "New").length}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">Preparing</p>
            <p className="mt-2 text-2xl font-bold text-[#E4572E]">
              {orders.filter((o) => o.status === "Preparing").length}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">Ready</p>
            <p className="mt-2 text-2xl font-bold text-yellow-600">
              {orders.filter((o) => o.status === "Ready").length}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="mt-2 text-2xl font-bold text-[#176B4D]">
              {orders.filter((o) => o.status === "Completed").length}
            </p>
          </Card>
        </div>

        <Card className="mt-8 overflow-hidden">
          <div className="flex flex-wrap gap-2 border-b border-[#E5E1D8] p-5">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  filter === status
                    ? "bg-[#E4572E] text-white"
                    : "bg-[#F7F5F0] text-gray-600 hover:bg-[#EEEAE2]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="divide-y divide-[#E5E1D8]">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-bold text-[#17211D]">
                        {order.number}
                      </h2>

                      <span className="text-sm text-gray-500">
                        {order.table}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-600">
                      {order.items}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      {order.time} · {order.payment}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <p className="text-lg font-bold text-[#17211D]">
                      NPR {order.amount.toLocaleString()}
                    </p>

                    {order.status === "New" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateStatus(order.id, "Preparing")
                        }
                        className="rounded-lg bg-[#E4572E] px-4 py-2.5 text-sm font-semibold text-white"
                      >
                        Start Preparing
                      </button>
                    )}

                    {order.status === "Preparing" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateStatus(order.id, "Ready")
                        }
                        className="rounded-lg bg-[#176B4D] px-4 py-2.5 text-sm font-semibold text-white"
                      >
                        Mark Ready
                      </button>
                    )}

                    {order.status === "Ready" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateStatus(order.id, "Completed")
                        }
                        className="rounded-lg bg-[#17211D] px-4 py-2.5 text-sm font-semibold text-white"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}