import axiosClient from "@/api/axiosClient";

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitMessage(data: ContactMessage) {
  const res = await axiosClient.post("/messages/", data);
  return res.data;
}
