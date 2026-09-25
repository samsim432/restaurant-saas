import { apiGet, apiPost } from "./client";

export interface Payment {
  id: number;
  order_id: number;
  method: string;
  status: string;
  amount: number;
  provider_transaction_id: string | null;
  paid_at: string | null;
}

export interface CashPaymentData {
  order_id: number;
  amount: number;
  idempotency_key?: string;
}

export function getPayments() {
  return apiGet<Payment[]>("/api/payments");
}

export function markCashPaid(data: CashPaymentData) {
  return apiPost<Payment>(
    "/api/payments/cash",
    data,
  );
}