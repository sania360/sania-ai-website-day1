import axiosClient from "@/api/axiosClient";

export interface AdminService {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  created_at: string;
}

export async function listAdminServices() {
  const res = await axiosClient.get<AdminService[]>("/services/");
  return res.data;
}
export async function createAdminService(payload: Omit<AdminService, "id" | "created_at">) {
  const res = await axiosClient.post<AdminService>("/services/", payload);
  return res.data;
}
export async function deleteAdminService(id: number) {
  await axiosClient.delete(`/services/${id}`);
}
