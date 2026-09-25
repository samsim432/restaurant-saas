import { useEffect, useMemo, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  getOrders,
  updateOrderStatus,
  type Order,
  type OrderStatus,
} from "../../api/orders";

const statuses: OrderStatus[] = [
  "new",
  "preparing",
  "ready",
  "completed",
];

const statusLabels: Record<OrderStatus, string> = {
  new: "New",
  preparing: "Preparing",
  ready: "Ready",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      setLoading(true);
      setError("");

      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load orders.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function changeStatus(
    order: Order,
    status: OrderStatus,
  ) {
    try {
      setError("");

      const updated = await updateOrderStatus(
        order.id,
        status,
      );

      setOrders((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update order.",
      );
    }
  }

  const groupedOrders = useMemo(() => {
    return statuses.map((status) => ({
      status,
      orders: orders.filter(
        (order) => order.status === status,
      ),
    }));
  }, [orders]);

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#E4572E]">
              Operations
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#17211D]">
              Orders
            </h1>

            <p className="mt-2 text-gray-600">
              Manage incoming orders and their status.
            </p>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={loadOrders}
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

        {loading ? (
          <Card className="p-10 text-center">
            <p className="text-sm text-gray-500">
              Loading orders...
            </p>
          </Card>
        ) : orders.length === 0 ? (
          <Card className="p-12 text-center">
            <h2 className="text-xl font-bold text-[#17211D]">
              No orders yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Orders created by customers will appear here.
            </p>
          </Card>
        ) : (
          <div className="grid gap-5 xl:grid-cols-4">
            {groupedOrders.map(
              ({ status, orders: statusOrders }) => (
                <div
                  key={status}
                  className="min-w-0"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-bold text-[#17211D]">
                      {statusLabels[status]}
                    </h2>

                    <span className="rounded-full bg-[#F7F5F0] px-3 py-1 text-xs font-semibold text-gray-600">
                      {statusOrders.length}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {statusOrders.map((order) => (
                      <Card
                        key={order.id}
                        className="p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-lg font-bold text-[#17211D]">
                              #{order.order_number}
                            </p>

                            {order.customer_name && (
                              <p className="mt-1 text-sm text-gray-500">
                                {order.customer_name}
                              </p>
                            )}
                          </div>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              order.payment_status ===
                              "paid"
                                ? "bg-green-100 text-[#176B4D]"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {order.payment_status}
                          </span>
                        </div>

                        <div className="mt-4 border-t border-[#E5E1D8] pt-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Table
                          </p>

                          <p className="mt-1 text-sm font-medium text-[#17211D]">
                            {order.table_id
                              ? `Table ${order.table_id}`
                              : "No table"}
                          </p>
                        </div>

                        <div className="mt-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Payment
                          </p>

                          <p className="mt-1 text-sm text-gray-700">
                            {order.payment_method ||
                              "Not selected"}
                          </p>
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                          <div>
                            <p className="text-xs text-gray-500">
                              Total
                            </p>

                            <p className="text-lg font-bold text-[#17211D]">
                              NPR{" "}
                              {Number(
                                order.total,
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          {status === "new" && (
                            <Button
                              type="button"
                              className="w-full"
                              onClick={() =>
                                changeStatus(
                                  order,
                                  "preparing",
                                )
                              }
                            >
                              Start Preparing
                            </Button>
                          )}

                          {status === "preparing" && (
                            <Button
                              type="button"
                              variant="success"
                              className="w-full"
                              onClick={() =>
                                changeStatus(
                                  order,
                                  "ready",
                                )
                              }
                            >
                              Mark Ready
                            </Button>
                          )}

                          {status === "ready" && (
                            <Button
                              type="button"
                              variant="success"
                              className="w-full"
                              onClick={() =>
                                changeStatus(
                                  order,
                                  "completed",
                                )
                              }
                            >
                              Complete Order
                            </Button>
                          )}

                          {status === "completed" && (
                            <div className="rounded-lg bg-green-50 px-4 py-3 text-center text-sm font-semibold text-[#176B4D]">
                              Order completed
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}