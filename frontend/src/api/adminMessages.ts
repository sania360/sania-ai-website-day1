import axiosClient from "@/api/axiosClient";

export interface AdminMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export async function listMessages() {
  const res = await axiosClient.get<AdminMessage[]>("/messages/");
  return res.data;
}

export async function markMessageRead(id: number) {
  const res = await axiosClient.patch<AdminMessage>(`/messages/${id}/read`);
  return res.data;
}
