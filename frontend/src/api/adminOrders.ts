import axiosClient from "@/api/axiosClient";

export interface AdminOrder {
  order_id: string;
  full_name: string;
  email: string;
  service: string;
  status: string;
  created_at: string;
  file_url: string | null;
}

export async function listOrders() {
  const res = await axiosClient.get<AdminOrder[]>("/orders/");
  return res.data;
}

export async function updateOrderStatus(orderId: string, status: string) {
  const res = await axiosClient.patch<AdminOrder>(`/orders/${orderId}/status`, { status });
  return res.data;
}

export async function exportOrdersCsv() {
  const res = await axiosClient.get("/orders/export/csv", { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "orders_export.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
}
