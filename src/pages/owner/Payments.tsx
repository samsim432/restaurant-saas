import AppLayout from "../../layouts/AppLayout";
import Card from "../../components/ui/Card";

const payments = [
  {
    id: "#PAY-1048",
    order: "#1048",
    method: "eSewa",
    amount: 850,
    status: "Paid",
    time: "10:42 AM",
  },
  {
    id: "#PAY-1047",
    order: "#1047",
    method: "Khalti",
    amount: 1240,
    status: "Paid",
    time: "10:36 AM",
  },
  {
    id: "#PAY-1046",
    order: "#1046",
    method: "Cash",
    amount: 720,
    status: "Pending",
    time: "10:31 AM",
  },
  {
    id: "#PAY-1045",
    order: "#1045",
    method: "eSewa",
    amount: 1560,
    status: "Paid",
    time: "10:18 AM",
  },
];

export default function Payments() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <p className="text-sm font-semibold text-[#E4572E]">
          Finance
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#17211D]">
          Payments
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Monitor restaurant payments and payment methods.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Today's revenue
            </p>

            <p className="mt-2 text-2xl font-bold text-[#17211D]">
              NPR 42,800
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Online payments
            </p>

            <p className="mt-2 text-2xl font-bold text-[#176B4D]">
              NPR 31,240
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Cash payments
            </p>

            <p className="mt-2 text-2xl font-bold text-[#E4572E]">
              NPR 11,560
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Pending
            </p>

            <p className="mt-2 text-2xl font-bold text-yellow-600">
              NPR 720
            </p>
          </Card>
        </div>

        <Card className="mt-8 overflow-hidden">
          <div className="border-b border-[#E5E1D8] px-6 py-5">
            <h2 className="font-semibold text-[#17211D]">
              Recent payments
            </h2>
          </div>

          <div className="divide-y divide-[#E5E1D8]">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-[#17211D]">
                    {payment.id}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Order {payment.order} · {payment.method}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {payment.time}
                  </p>
                </div>

                <div className="flex items-center gap-5">
                  <p className="font-bold text-[#17211D]">
                    NPR {payment.amount.toLocaleString()}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      payment.status === "Paid"
                        ? "bg-green-50 text-[#176B4D]"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm font-semibold text-[#17211D]">
              eSewa
            </p>

            <p className="mt-2 text-2xl font-bold">
              54%
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Of online payment volume
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-semibold text-[#17211D]">
              Khalti
            </p>

            <p className="mt-2 text-2xl font-bold">
              31%
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Of online payment volume
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-semibold text-[#17211D]">
              Cash
            </p>

            <p className="mt-2 text-2xl font-bold">
              15%
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Of today's payment volume
            </p>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}