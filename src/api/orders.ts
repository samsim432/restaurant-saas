import { apiGet, apiPatch } from "./client";

export type OrderStatus =
  | "new"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export interface Order {
  id: number;
  order_number: number;
  table_id: number | null;
  status: OrderStatus;
  payment_status: string;
  payment_method: string | null;
  subtotal: number;
  tax: number;
  total: number;
  customer_name: string | null;
  customer_phone: string | null;
}

export function getOrders() {
  return apiGet<Order[]>("/api/orders");
}

export function getOrder(orderId: number) {
  return apiGet<Order>(`/api/orders/${orderId}`);
}

export function updateOrderStatus(
  orderId: number,
  status: OrderStatus,
) {
  return apiPatch<Order>(
    `/api/orders/${orderId}/status`,
    { status },
  );
}