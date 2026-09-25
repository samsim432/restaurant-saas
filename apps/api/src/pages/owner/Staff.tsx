import { useEffect, useMemo, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  activateStaff,
  deactivateStaff,
  getStaff,
  inviteStaff,
  updateStaffRole,
  type StaffMember,
  type StaffRole,
} from "../../api/staff";

type FormData = {
  full_name: string;
  email: string;
  phone: string;
  role: "manager" | "staff";
};

const initialForm: FormData = {
  full_name: "",
  email: "",
  phone: "",
  role: "staff",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Staff() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

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
          : "Failed to load staff.",
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

    return staff.filter(
      (member) =>
        member.full_name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query),
    );
  }, [staff, search]);

  const totalStaff = staff.length;

  const activeStaff = staff.filter(
    (member) => member.is_active,
  ).length;

  const managers = staff.filter(
    (member) => member.role === "manager",
  ).length;

  const regularStaff = staff.filter(
    (member) => member.role === "staff",
  ).length;

  function updateField(
    field: keyof FormData,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function closeModal() {
    if (saving) return;

    setShowModal(false);
    setForm(initialForm);
    setError("");
  }

  async function handleInvite(event: React.FormEvent) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!form.full_name.trim()) {
      setError("Please enter the staff member's name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter the staff member's email.");
      return;
    }

    try {
      setSaving(true);

      const response = await inviteStaff({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        role: form.role,
      });

      setMessage(response.message);

      setShowModal(false);
      setForm(initialForm);

      await loadStaff();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create staff invitation.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleRoleChange(
    membershipId: number,
    role: StaffRole,
  ) {
    try {
      setError("");

      await updateStaffRole(
        membershipId,
        role,
      );

      await loadStaff();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update role.",
      );
    }
  }

  async function handleToggle(
    member: StaffMember,
  ) {
    try {
      setError("");

      if (member.is_active) {
        await deactivateStaff(member.membership_id);
      } else {
        await activateStaff(member.membership_id);
      }

      await loadStaff();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update staff status.",
      );
    }
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#E4572E]">
              Team Management
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#17211D]">
              Staff
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Manage your restaurant team, roles and access.
            </p>
          </div>

          <Button
            onClick={() => {
              setError("");
              setMessage("");
              setShowModal(true);
            }}
          >
            + Add Staff
          </Button>
        </div>

        {/* Messages */}
        {message && (
          <div className="mt-6 rounded-lg border border-[#BFE3D2] bg-[#EFFAF5] px-4 py-3 text-sm font-medium text-[#176B4D]">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Total Staff
            </p>

            <p className="mt-2 text-3xl font-bold text-[#17211D]">
              {totalStaff}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Active
            </p>

            <p className="mt-2 text-3xl font-bold text-[#176B4D]">
              {activeStaff}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Managers
            </p>

            <p className="mt-2 text-3xl font-bold text-[#17211D]">
              {managers}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Staff
            </p>

            <p className="mt-2 text-3xl font-bold text-[#17211D]">
              {regularStaff}
            </p>
          </Card>
        </div>

        {/* Staff list */}
        <Card className="mt-8 overflow-hidden">
          <div className="border-b border-[#E5E1D8] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#17211D]">
                  Team Members
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Control who can access your restaurant.
                </p>
              </div>

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search staff..."
                className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#E4572E] sm:w-64"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-500">
                Loading team members...
              </p>
            </div>
          ) : filteredStaff.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F5F0] text-xl">
                👤
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#17211D]">
                No staff members found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Add your first manager or staff member to
                start building your restaurant team.
              </p>

              <Button
                className="mt-5"
                onClick={() => setShowModal(true)}
              >
                Add Staff
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-[#E5E1D8]">
              {filteredStaff.map((member) => (
                <div
                  key={member.membership_id}
                  className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#176B4D] text-sm font-bold text-white">
                      {getInitials(member.full_name)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-[#17211D]">
                          {member.full_name}
                        </h3>

                        {member.role === "owner" && (
                          <span className="rounded-full bg-[#FFF1EC] px-2.5 py-1 text-xs font-semibold text-[#E4572E]">
                            Owner
                          </span>
                        )}

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            member.is_active
                              ? "bg-[#EFFAF5] text-[#176B4D]"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {member.is_active
                            ? "Active"
                            : "Disabled"}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-sm text-gray-500">
                        {member.email}
                      </p>

                      {member.phone && (
                        <p className="mt-0.5 text-xs text-gray-400">
                          {member.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={member.role}
                      disabled={member.role === "owner"}
                      onChange={(event) =>
                        handleRoleChange(
                          member.membership_id,
                          event.target.value as StaffRole,
                        )
                      }
                      className="rounded-lg border border-[#E5E1D8] bg-white px-3 py-2 text-sm font-medium text-[#17211D] outline-none focus:border-[#E4572E] disabled:bg-gray-100 disabled:text-gray-500"
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

                    {member.role !== "owner" && (
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleToggle(member)
                        }
                      >
                        {member.is_active
                          ? "Disable"
                          : "Activate"}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Add Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white">
            <div className="border-b border-[#E5E1D8] px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#17211D]">
                    Add Staff
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Invite a team member to your restaurant.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="text-xl text-gray-400 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            </div>

            <form
              onSubmit={handleInvite}
              className="space-y-5 p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                  Full name
                </label>

                <input
                  type="text"
                  value={form.full_name}
                  onChange={(event) =>
                    updateField(
                      "full_name",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Ram Sharma"
                  className="w-full rounded-lg border border-[#E5E1D8] px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#17211D]">
                  Email address
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField(
                      "email",
                      event.target.value,
                    )
                  }
                  placeholder="staff@example.com"
                  className="w-full rounded-lg border border-[#E5E1D8] px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                  required
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
                    updateField(
                      "phone",
                      event.target.value,
                    )
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
                    updateField(
                      "role",
                      event.target.value,
                    )
                  }
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                >
                  <option value="staff">
                    Staff
                  </option>

                  <option value="manager">
                    Manager
                  </option>
                </select>
              </div>

              <div className="rounded-lg border border-[#E5E1D8] bg-[#FCFAF6] p-4">
                <p className="text-sm font-semibold text-[#17211D]">
                  Invitation
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  The staff member will receive an invitation
                  and create their password when they accept it.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? "Sending..."
                    : "Send Invitation"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}