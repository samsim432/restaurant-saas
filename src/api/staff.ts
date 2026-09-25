import { apiGet, apiPatch, apiPost } from "./client";

export type StaffRole =
  | "owner"
  | "manager"
  | "staff";

export interface StaffMember {
  membership_id: number;
  user_id: number;
  full_name: string;
  email: string;
  phone: string | null;
  role: StaffRole;
  is_active: boolean;
}

export function getStaff() {
  return apiGet<StaffMember[]>("/api/staff");
}

export function updateStaffRole(
  membershipId: number,
  role: StaffRole,
) {
  return apiPatch<StaffMember>(
    `/api/staff/${membershipId}`,
    { role },
  );
}

export function deactivateStaff(
  membershipId: number,
) {
  return apiPost<StaffMember>(
    `/api/staff/${membershipId}/deactivate`,
  );
}

export function activateStaff(
  membershipId: number,
) {
  return apiPost<StaffMember>(
    `/api/staff/${membershipId}/activate`,
  );
}