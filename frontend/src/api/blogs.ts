import axiosClient from "@/api/axiosClient";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content_markdown: string;
  tags: string | null;
  featured_image: string | null;
  created_at: string;
}

export async function listBlogs() {
  const res = await axiosClient.get<BlogPost[]>("/blogs/");
  return res.data;
}

export async function getBlogBySlug(slug: string) {
  const res = await axiosClient.get<BlogPost>(`/blogs/${slug}`);
  return res.data;
}

export function parseTags(tags: string | null): string[] {
  if (!tags) return [];
  return tags.split(",").map((t) => t.trim()).filter(Boolean);
}
