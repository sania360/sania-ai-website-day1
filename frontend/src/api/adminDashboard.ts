import axiosClient from "@/api/axiosClient";

export interface DashboardSummary {
  total_orders: number;
  orders_by_status: Record<string, number>;
  total_messages: number;
  unread_messages: number;
}

export async function fetchDashboardSummary() {
  const res = await axiosClient.get<DashboardSummary>("/admin/dashboard/summary");
  return res.data;
}
