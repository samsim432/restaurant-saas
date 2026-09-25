import { apiGet } from "./client";

export interface ReportSummary {
  total_orders: number;
  paid_revenue: number;
  completed_orders: number;
  average_order: number;
}

export function getReportSummary() {
  return apiGet<ReportSummary>(
    "/api/reports/summary",
  );
}