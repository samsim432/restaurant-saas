import { apiDelete, apiGet, apiPatch, apiPost } from "./client";

export interface RestaurantTable {
  id: number;
  name: string;
  capacity: number;
  qr_token: string;
  is_active: boolean;
}

export interface CreateTableData {
  name: string;
  capacity: number;
}

export interface UpdateTableData {
  name?: string;
  capacity?: number;
  is_active?: boolean;
}

export function getTables() {
  return apiGet<RestaurantTable[]>("/api/tables");
}

export function createTable(data: CreateTableData) {
  return apiPost<RestaurantTable>("/api/tables", data);
}

export function updateTable(
  tableId: number,
  data: UpdateTableData,
) {
  return apiPatch<RestaurantTable>(
    `/api/tables/${tableId}`,
    data,
  );
}

export function deleteTable(tableId: number) {
  return apiDelete<{ message: string }>(
    `/api/tables/${tableId}`,
  );
}