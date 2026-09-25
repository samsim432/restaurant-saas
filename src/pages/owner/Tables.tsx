import { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  createTable,
  deleteTable,
  getTables,
  updateTable,
  type RestaurantTable,
} from "../../api/tables";

export default function Tables() {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [tableName, setTableName] = useState("");
  const [capacity, setCapacity] = useState("4");
  const [saving, setSaving] = useState(false);

  async function loadTables() {
    try {
      setLoading(true);
      setError("");

      const data = await getTables();
      setTables(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load tables.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTables();
  }, []);

  async function handleCreateTable(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!tableName.trim()) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const newTable = await createTable({
        name: tableName.trim(),
        capacity: Number(capacity),
      });

      setTables((current) => [...current, newTable]);

      setTableName("");
      setCapacity("4");
      setShowAddModal(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create table.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(table: RestaurantTable) {
    try {
      setError("");

      const updated = await updateTable(table.id, {
        is_active: !table.is_active,
      });

      setTables((current) =>
        current.map((item) =>
          item.id === updated.id ? updated : item,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update table.",
      );
    }
  }

  async function handleDelete(table: RestaurantTable) {
    const confirmed = window.confirm(
      `Delete ${table.name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteTable(table.id);

      setTables((current) =>
        current.filter((item) => item.id !== table.id),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete table.",
      );
    }
  }

  function getQrUrl(table: RestaurantTable) {
    return `${window.location.origin}/menu/${table.qr_token}`;
  }

  async function copyQrLink(table: RestaurantTable) {
    try {
      await navigator.clipboard.writeText(
        getQrUrl(table),
      );

      window.alert("QR link copied.");
    } catch {
      window.alert(getQrUrl(table));
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#E4572E]">
              Restaurant
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#17211D]">
              Tables
            </h1>

            <p className="mt-2 text-gray-600">
              Manage restaurant tables and their QR links.
            </p>
          </div>

          <Button
            type="button"
            onClick={() => setShowAddModal(true)}
          >
            + Add Table
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
              Loading tables...
            </p>
          </Card>
        ) : tables.length === 0 ? (
          <Card className="p-10 text-center">
            <h2 className="text-lg font-bold text-[#17211D]">
              No tables yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Add your first restaurant table to get started.
            </p>

            <div className="mt-5">
              <Button
                type="button"
                onClick={() => setShowAddModal(true)}
              >
                Add First Table
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {tables.map((table) => (
              <Card key={table.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#17211D]">
                      {table.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Capacity: {table.capacity}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      table.is_active
                        ? "bg-green-100 text-[#176B4D]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {table.is_active
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>

                <div className="mt-5 rounded-lg border border-[#E5E1D8] bg-[#FCFAF6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    QR Token
                  </p>

                  <p className="mt-2 break-all text-xs text-gray-600">
                    {table.qr_token}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      handleToggle(table)
                    }
                  >
                    {table.is_active
                      ? "Deactivate"
                      : "Activate"}
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      copyQrLink(table)
                    }
                  >
                    Copy QR Link
                  </Button>

                  <Button
                    type="button"
                    variant="danger"
                    onClick={() =>
                      handleDelete(table)
                    }
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
            <Card className="w-full max-w-md p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#17211D]">
                  Add Table
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                  className="text-2xl text-gray-400 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={handleCreateTable}
                className="mt-6 space-y-5"
              >
                <div>
                  <label className="text-sm font-semibold text-[#17211D]">
                    Table name
                  </label>

                  <input
                    value={tableName}
                    onChange={(event) =>
                      setTableName(event.target.value)
                    }
                    placeholder="Table 01"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 outline-none focus:border-[#E4572E]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#17211D]">
                    Capacity
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={capacity}
                    onChange={(event) =>
                      setCapacity(event.target.value)
                    }
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 outline-none focus:border-[#E4572E]"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() =>
                      setShowAddModal(false)
                    }
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={saving}
                  >
                    {saving
                      ? "Creating..."
                      : "Create Table"}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}