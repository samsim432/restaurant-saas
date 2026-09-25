import { useEffect, useMemo, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import {
  activateStaff,
  deactivateStaff,
  getStaff,
  updateStaffRole,
  type StaffMember,
  type StaffRole,
} from "../../api/staff";

type StaffForm = {
  full_name: string;
  email: string;
  phone: string;
  role: StaffRole;
};

const emptyForm: StaffForm = {
  full_name: "",
  email: "",
  phone: "",
  role: "staff",
};

export default function Staff() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState<StaffForm>(emptyForm);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadStaff() {
    try {
      setLoading(true);
      setError("");

      const data = await getStaff();
      setStaff(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not load staff.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStaff();
  }, []);

  const filteredStaff = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return staff;
    }

    return staff.filter((member) => {
      return (
        member.full_name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query)
      );
    });
  }, [staff, search]);

  function openAddStaff() {
    setForm(emptyForm);
    setError("");
    setMessage("");
    setShowAdd(true);
  }

  function closeAddStaff() {
    if (saving) return;

    setShowAdd(false);
    setForm(emptyForm);
  }

  async function handleAddStaff(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!form.full_name.trim()) {
      setError("Please enter the staff member's name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter the staff member's email.");
      return;
    }

    /*
     * Staff invitation endpoint will be connected
     * when the backend invitation system is implemented.
     */
    setSaving(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 500),
      );

      setMessage(
        "Staff invitation flow is ready for backend connection.",
      );

      setShowAdd(false);
      setForm(emptyForm);
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleStatus(
    member: StaffMember,
  ) {
    try {
      setError("");
      setMessage("");

      if (member.is_active) {
        await deactivateStaff(member.membership_id);
        setMessage(
          `${member.full_name} has been disabled.`,
        );
      } else {
        await activateStaff(member.membership_id);
        setMessage(
          `${member.full_name} has been activated.`,
        );
      }

      await loadStaff();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not update staff status.",
      );
    }
  }

  async function handleRoleChange(
    member: StaffMember,
    role: StaffRole,
  ) {
    if (member.role === role) return;

    try {
      setError("");
      setMessage("");

      await updateStaffRole(
        member.membership_id,
        role,
      );

      setMessage(
        `${member.full_name}'s role has been updated.`,
      );

      await loadStaff();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not update staff role.",
      );
    }
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#E4572E]">
              Team management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#17211D]">
              Staff
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Manage your restaurant team, roles, and account
              access from one place.
            </p>
          </div>

          <Button onClick={openAddStaff}>
            + Add Staff
          </Button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Total staff
            </p>

            <p className="mt-2 text-3xl font-bold text-[#17211D]">
              {staff.length}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Active
            </p>

            <p className="mt-2 text-3xl font-bold text-[#176B4D]">
              {staff.filter(
                (member) => member.is_active,
              ).length}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Managers
            </p>

            <p className="mt-2 text-3xl font-bold text-[#17211D]">
              {
                staff.filter(
                  (member) =>
                    member.role === "manager",
                ).length
              }
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Staff members
            </p>

            <p className="mt-2 text-3xl font-bold text-[#17211D]">
              {
                staff.filter(
                  (member) =>
                    member.role === "staff",
                ).length
              }
            </p>
          </Card>
        </div>

        {/* Staff list */}
        <Card className="mt-8 overflow-hidden">
          <div className="border-b border-[#E5E1D8] p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#17211D]">
                  Team members
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage access to your restaurant.
                </p>
              </div>

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search staff..."
                className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#E4572E] lg:w-72"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-sm text-gray-500">
              Loading staff...
            </div>
          ) : filteredStaff.length === 0 ? (
            <div className="p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F5F0] text-xl">
                👤
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#17211D]">
                No staff members found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Add your first team member to start managing
                restaurant access.
              </p>

              <Button
                className="mt-5"
                onClick={openAddStaff}
              >
                + Add Staff
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-[#E5E1D8]">
              {filteredStaff.map((member) => (
                <div
                  key={member.membership_id}
                  className="p-5"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#17211D] text-sm font-bold text-white">
                        {member.full_name
                          .split(" ")
                          .map((part) =>
                            part.charAt(0),
                          )
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-[#17211D]">
                            {member.full_name}
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              member.is_active
                                ? "bg-green-50 text-[#176B4D]"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {member.is_active
                              ? "Active"
                              : "Disabled"}
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                          {member.email}
                        </p>

                        {member.phone && (
                          <p className="mt-1 text-xs text-gray-400">
                            {member.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <select
                        value={member.role}
                        onChange={(event) =>
                          handleRoleChange(
                            member,
                            event.target
                              .value as StaffRole,
                          )
                        }
                        className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-sm font-medium text-[#17211D] outline-none focus:border-[#E4572E]"
                      >
                        <option value="owner">
                          Owner
                        </option>

                        <option value="manager">
                          Manager
                        </option>

                        <option value="staff">
                          Staff
                        </option>
                      </select>

                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleToggleStatus(
                            member,
                          )
                        }
                      >
                        {member.is_active
                          ? "Disable"
                          : "Activate"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Add staff modal */}
        {showAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#17211D]">
                    Add staff member
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Invite a team member to your restaurant.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeAddStaff}
                  className="text-xl text-gray-400 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={handleAddStaff}
                className="mt-6 space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                    Full name
                  </label>

                  <input
                    value={form.full_name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        full_name:
                          event.target.value,
                      })
                    }
                    placeholder="Staff member name"
                    className="w-full rounded-lg border border-[#E5E1D8] px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                    Email
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        email: event.target.value,
                      })
                    }
                    placeholder="staff@example.com"
                    className="w-full rounded-lg border border-[#E5E1D8] px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                    Phone
                  </label>

                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        phone: event.target.value,
                      })
                    }
                    placeholder="+977 98XXXXXXXX"
                    className="w-full rounded-lg border border-[#E5E1D8] px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                    Role
                  </label>

                  <select
                    value={form.role}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        role: event.target
                          .value as StaffRole,
                      })
                    }
                    className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                  >
                    <option value="manager">
                      Manager
                    </option>

                    <option value="staff">
                      Staff
                    </option>
                  </select>
                </div>

                <div className="rounded-lg bg-[#F7F5F0] p-4">
                  <p className="text-sm font-semibold text-[#17211D]">
                    Invitation
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    The staff invitation and account activation
                    will be connected to the backend invitation
                    system next.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closeAddStaff}
                    className="flex-1"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={saving}
                    className="flex-1"
                  >
                    {saving
                      ? "Sending..."
                      : "Invite Staff"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}