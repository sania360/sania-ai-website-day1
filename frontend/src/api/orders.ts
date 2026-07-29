import axiosClient from "@/api/axiosClient";
import type { OrderFormData, OrderResponse } from "@/types/order";

export async function submitOrder(data: OrderFormData): Promise<OrderResponse> {
  const formData = new FormData();
  formData.append("full_name", data.fullName);
  formData.append("company", data.company);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("country", data.country);
  formData.append("service", data.service);
  formData.append("budget", data.budget);
  formData.append("deadline", data.deadline);
  formData.append("description", data.description);
  formData.append("notes", data.notes);
  if (data.file) formData.append("file", data.file);

  const res = await axiosClient.post<OrderResponse>("/orders/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}
