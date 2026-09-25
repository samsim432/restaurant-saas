import { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  getPayments,
  markCashPaid,
  type Payment,
} from "../../api/payments";

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadPayments() {
    try {
      setLoading(true);
      setError("");

      const data = await getPayments();
      setPayments(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load payments.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  async function handleCashPayment(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!orderId || !amount) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payment = await markCashPaid({
        order_id: Number(orderId),
        amount: Number(amount),
        idempotency_key: crypto.randomUUID(),
      });

      setPayments((current) => [
        payment,
        ...current,
      ]);

      setOrderId("");
      setAmount("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to mark payment.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#E4572E]">
              Finance
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#17211D]">
              Payments
            </h1>

            <p className="mt-2 text-gray-600">
              Track payments and mark cash orders as paid.
            </p>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={loadPayments}
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

        <Card className="p-6">
          <h2 className="text-lg font-bold text-[#17211D]">
            Mark Cash Payment
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Use this when a customer pays at the counter.
          </p>

          <form
            onSubmit={handleCashPayment}
            className="mt-5 grid gap-4 md:grid-cols-3"
          >
            <input
              type="number"
              min="1"
              value={orderId}
              onChange={(event) =>
                setOrderId(event.target.value)
              }
              placeholder="Order ID"
              className="rounded-lg border border-[#E5E1D8] px-4 py-3 outline-none focus:border-[#E4572E]"
            />

            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              placeholder="Amount"
              className="rounded-lg border border-[#E5E1D8] px-4 py-3 outline-none focus:border-[#E4572E]"
            />

            <Button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Processing..."
                : "Mark Paid"}
            </Button>
          </form>
        </Card>

        {loading ? (
          <Card className="p-10 text-center">
            <p className="text-sm text-gray-500">
              Loading payments...
            </p>
          </Card>
        ) : payments.length === 0 ? (
          <Card className="p-10 text-center">
            <h2 className="text-lg font-bold text-[#17211D]">
              No payments yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Completed payments will appear here.
            </p>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="border-b border-[#E5E1D8] bg-[#FCFAF6]">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Payment
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Order
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Method
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Amount
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Paid
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-[#E5E1D8] last:border-0"
                    >
                      <td className="px-5 py-4 font-semibold text-[#17211D]">
                        #{payment.id}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        #{payment.order_id}
                      </td>

                      <td className="px-5 py-4 text-sm capitalize text-gray-600">
                        {payment.method}
                      </td>

                      <td className="px-5 py-4 font-semibold text-[#17211D]">
                        NPR{" "}
                        {Number(
                          payment.amount,
                        ).toLocaleString()}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            payment.status === "paid"
                              ? "bg-green-100 text-[#176B4D]"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-500">
                        {payment.paid_at
                          ? new Date(
                              payment.paid_at,
                            ).toLocaleString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}