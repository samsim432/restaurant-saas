import { useState } from "react";

import AppLayout from "../../layouts/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: "Owner" | "Manager" | "Staff";
  status: "Active" | "Inactive";
}

const initialStaff: StaffMember[] = [
  {
    id: 1,
    name: "Samir Simkhada",
    email: "owner@restaurantos.com",
    role: "Owner",
    status: "Active",
  },
  {
    id: 2,
    name: "Raj Sharma",
    email: "raj@restaurant.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Anita Thapa",
    email: "anita@restaurant.com",
    role: "Staff",
    status: "Active",
  },
  {
    id: 4,
    name: "Bikash KC",
    email: "bikash@restaurant.com",
    role: "Staff",
    status: "Inactive",
  },
];

export default function Staff() {
  const [staff, setStaff] =
    useState<StaffMember[]>(initialStaff);

  const [showModal, setShowModal] = useState(false);

  function toggleStatus(id: number) {
    setStaff((current) =>
      current.map((member) =>
        member.id === id
          ? {
              ...member,
              status:
                member.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : member,
      ),
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#E4572E]">
              Restaurant management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#17211D]">
              Staff
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage restaurant staff and their access.
            </p>
          </div>

          <Button onClick={() => setShowModal(true)}>
            + Add Staff
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Total staff
            </p>

            <p className="mt-2 text-2xl font-bold">
              {staff.length}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Active
            </p>

            <p className="mt-2 text-2xl font-bold text-[#176B4D]">
              {staff.filter(
                (member) => member.status === "Active",
              ).length}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Managers
            </p>

            <p className="mt-2 text-2xl font-bold text-[#E4572E]">
              {staff.filter(
                (member) => member.role === "Manager",
              ).length}
            </p>
          </Card>
        </div>

        <Card className="mt-8 overflow-hidden">
          <div className="divide-y divide-[#E5E1D8]">
            {staff.map((member) => (
              <div
                key={member.id}
                className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#17211D] font-bold text-white">
                    {member.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold text-[#17211D]">
                      {member.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {member.email}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#F7F5F0] px-3 py-1 text-xs font-semibold text-gray-600">
                    {member.role}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      member.status === "Active"
                        ? "bg-green-50 text-[#176B4D]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {member.status}
                  </span>

                  {member.role !== "Owner" && (
                    <button
                      type="button"
                      onClick={() =>
                        toggleStatus(member.id)
                      }
                      className="rounded-lg border border-[#E5E1D8] px-4 py-2 text-xs font-semibold text-gray-600"
                    >
                      {member.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6">
            <div className="w-full max-w-md rounded-xl bg-white p-7">
              <h2 className="text-xl font-bold text-[#17211D]">
                Add staff
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Staff invitations will be connected to the backend later.
              </p>

              <div className="mt-6 space-y-4">
                <input
                  placeholder="Full name"
                  className="w-full rounded-lg border border-[#E5E1D8] px-4 py-3 text-sm"
                />

                <input
                  placeholder="Email address"
                  type="email"
                  className="w-full rounded-lg border border-[#E5E1D8] px-4 py-3 text-sm"
                />

                <select className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm">
                  <option>Staff</option>
                  <option>Manager</option>
                </select>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>

                <Button
                  className="flex-1"
                  onClick={() => setShowModal(false)}
                >
                  Send Invitation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}