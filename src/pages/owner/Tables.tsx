import { FormEvent, useMemo, useState } from "react";

import AppLayout from "../../layouts/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

interface Table {
  id: number;
  name: string;
  capacity: number;
  status: "Available" | "Occupied" | "Inactive";
  qrStatus: "Active" | "Not Generated";
}

const initialTables: Table[] = [
  {
    id: 1,
    name: "Table 01",
    capacity: 2,
    status: "Available",
    qrStatus: "Active",
  },
  {
    id: 2,
    name: "Table 02",
    capacity: 4,
    status: "Occupied",
    qrStatus: "Active",
  },
  {
    id: 3,
    name: "Table 03",
    capacity: 4,
    status: "Available",
    qrStatus: "Active",
  },
  {
    id: 4,
    name: "Table 04",
    capacity: 6,
    status: "Available",
    qrStatus: "Active",
  },
  {
    id: 5,
    name: "Table 05",
    capacity: 2,
    status: "Inactive",
    qrStatus: "Not Generated",
  },
  {
    id: 6,
    name: "Table 06",
    capacity: 8,
    status: "Available",
    qrStatus: "Active",
  },
];

export default function Tables() {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [tableName, setTableName] = useState("");
  const [capacity, setCapacity] = useState("4");

  const filteredTables = useMemo(() => {
    return tables.filter((table) =>
      table.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [tables, search]);

  const availableCount = tables.filter(
    (table) => table.status === "Available",
  ).length;

  const occupiedCount = tables.filter(
    (table) => table.status === "Occupied",
  ).length;

  const inactiveCount = tables.filter(
    (table) => table.status === "Inactive",
  ).length;

  function handleAddTable(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!tableName.trim()) {
      return;
    }

    const newTable: Table = {
      id: Date.now(),
      name: tableName.trim(),
      capacity: Number(capacity),
      status: "Available",
      qrStatus: "Not Generated",
    };

    setTables((current) => [...current, newTable]);

    setTableName("");
    setCapacity("4");
    setShowModal(false);
  }

  function generateQr(id: number) {
    setTables((current) =>
      current.map((table) =>
        table.id === id
          ? {
              ...table,
              qrStatus: "Active",
            }
          : table,
      ),
    );
  }

  function toggleStatus(id: number) {
    setTables((current) =>
      current.map((table) => {
        if (table.id !== id) {
          return table;
        }

        if (table.status === "Inactive") {
          return {
            ...table,
            status: "Available",
          };
        }

        return {
          ...table,
          status: "Inactive",
        };
      }),
    );
  }

  function deleteTable(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this table?",
    );

    if (!confirmed) {
      return;
    }

    setTables((current) =>
      current.filter((table) => table.id !== id),
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#E4572E]">
              Restaurant setup
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#17211D]">
              Tables
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your restaurant tables and customer QR codes.
            </p>
          </div>

          <Button onClick={() => setShowModal(true)}>
            + Add Table
          </Button>
        </div>

        {/* Summary */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Total tables
            </p>

            <p className="mt-2 text-2xl font-bold text-[#17211D]">
              {tables.length}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Available
            </p>

            <p className="mt-2 text-2xl font-bold text-[#176B4D]">
              {availableCount}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Occupied
            </p>

            <p className="mt-2 text-2xl font-bold text-[#E4572E]">
              {occupiedCount}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Inactive
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-500">
              {inactiveCount}
            </p>
          </Card>
        </div>

        {/* Table management */}
        <Card className="mt-8 overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-[#E5E1D8] px-6 py-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-semibold text-[#17211D]">
                Restaurant tables
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Each active table can have a permanent customer QR code.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tables..."
              className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#E4572E] md:w-64"
            />
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="bg-[#F7F5F0]">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Table
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Capacity
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    QR Code
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E5E1D8]">
                {filteredTables.map((table) => (
                  <tr
                    key={table.id}
                    className="hover:bg-[#FCFAF6]"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-[#17211D]">
                        {table.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        ID: {table.id}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {table.capacity} seats
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          table.status === "Available"
                            ? "bg-green-50 text-[#176B4D]"
                            : table.status === "Occupied"
                              ? "bg-orange-50 text-[#E4572E]"
                              : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {table.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {table.qrStatus === "Active" ? (
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-[#176B4D]">
                          Active
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => generateQr(table.id)}
                          className="text-sm font-semibold text-[#E4572E] hover:underline"
                        >
                          Generate QR
                        </button>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => toggleStatus(table.id)}
                          className="rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-[#F7F5F0]"
                        >
                          {table.status === "Inactive"
                            ? "Activate"
                            : "Deactivate"}
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteTable(table.id)}
                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-[#E5E1D8] md:hidden">
            {filteredTables.map((table) => (
              <div
                key={table.id}
                className="p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#17211D]">
                      {table.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {table.capacity} seats
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      table.status === "Available"
                        ? "bg-green-50 text-[#176B4D]"
                        : table.status === "Occupied"
                          ? "bg-orange-50 text-[#E4572E]"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {table.status}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    {table.qrStatus === "Active" ? (
                      <span className="text-xs font-semibold text-[#176B4D]">
                        ✓ QR Active
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => generateQr(table.id)}
                        className="text-xs font-semibold text-[#E4572E]"
                      >
                        Generate QR
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => toggleStatus(table.id)}
                      className="rounded-lg border border-[#E5E1D8] px-3 py-2 text-xs font-semibold text-gray-600"
                    >
                      {table.status === "Inactive"
                        ? "Activate"
                        : "Deactivate"}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteTable(table.id)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTables.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="font-semibold text-[#17211D]">
                No tables found
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Try another search or create a new table.
              </p>
            </div>
          )}
        </Card>

        {/* QR information */}
        <div className="mt-8 rounded-xl border border-[#E5E1D8] bg-[#17211D] p-6 text-white md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#F2B84B]">
                Permanent table QR codes
              </p>

              <h2 className="mt-2 text-xl font-bold">
                One QR code per table.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-300">
                Customers will scan the table QR code to open your live
                menu and place an order. The QR code stays connected to
                that table.
              </p>
            </div>

            <Button
              variant="secondary"
              onClick={() => alert("Bulk QR printing will be available soon.")}
            >
              Print QR Codes
            </Button>
          </div>
        </div>
      </div>

      {/* Add table modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-md rounded-xl border border-[#E5E1D8] bg-white p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#17211D]">
                  Add table
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Create a new restaurant table.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-xl text-gray-400 hover:text-gray-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleAddTable}
              className="mt-6 space-y-5"
            >
              <div>
                <label
                  htmlFor="tableName"
                  className="text-sm font-semibold text-[#17211D]"
                >
                  Table name
                </label>

                <input
                  id="tableName"
                  type="text"
                  value={tableName}
                  onChange={(event) =>
                    setTableName(event.target.value)
                  }
                  placeholder="Table 07"
                  className="mt-2 w-full rounded-lg border border-[#E5E1D8] px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                />
              </div>

              <div>
                <label
                  htmlFor="capacity"
                  className="text-sm font-semibold text-[#17211D]"
                >
                  Seating capacity
                </label>

                <select
                  id="capacity"
                  value={capacity}
                  onChange={(event) =>
                    setCapacity(event.target.value)
                  }
                  className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                >
                  <option value="2">2 people</option>
                  <option value="4">4 people</option>
                  <option value="6">6 people</option>
                  <option value="8">8 people</option>
                  <option value="10">10 people</option>
                  <option value="12">12 people</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="flex-1"
                >
                  Add Table
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}