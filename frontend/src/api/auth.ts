import axiosClient from "@/api/axiosClient";

export async function login(username: string, password: string) {
  const res = await axiosClient.post<{ access_token: string; token_type: string }>("/auth/login", {
    username,
    password,
  });
  return res.data;
}

export async function fetchMe() {
  const res = await axiosClient.get<{ username: string }>("/auth/me");
  return res.data;
}

export async function changePassword(current_password: string, new_password: string) {
  const res = await axiosClient.patch("/auth/change-password", { current_password, new_password });
  return res.data;
}
