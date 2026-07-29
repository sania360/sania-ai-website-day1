import axiosClient from "@/api/axiosClient";

export interface AdminProject {
  id: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  github: string | null;
  live_demo: string | null;
  created_at: string;
}

export async function listAdminProjects() {
  const res = await axiosClient.get<AdminProject[]>("/projects/");
  return res.data;
}
export async function createAdminProject(payload: Omit<AdminProject, "id" | "created_at">) {
  const res = await axiosClient.post<AdminProject>("/projects/", payload);
  return res.data;
}
export async function deleteAdminProject(id: number) {
  await axiosClient.delete(`/projects/${id}`);
}
