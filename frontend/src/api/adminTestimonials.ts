import axiosClient from "@/api/axiosClient";

export interface Testimonial {
  id: number;
  author: string;
  quote: string;
  is_featured: boolean;
  created_at: string;
}

export async function listTestimonials() {
  const res = await axiosClient.get<Testimonial[]>("/testimonials/");
  return res.data;
}
export async function createTestimonial(author: string, quote: string, is_featured = false) {
  const res = await axiosClient.post<Testimonial>("/testimonials/", { author, quote, is_featured });
  return res.data;
}
export async function deleteTestimonial(id: number) {
  await axiosClient.delete(`/testimonials/${id}`);
}
