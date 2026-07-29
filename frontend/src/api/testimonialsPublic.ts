import axiosClient from "@/api/axiosClient";

export interface PublicTestimonial {
  id: number;
  author: string;
  quote: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
}

export async function listPublicTestimonials() {
  const res = await axiosClient.get<PublicTestimonial[]>("/testimonials/");
  return res.data;
}
