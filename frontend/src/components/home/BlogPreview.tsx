import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listBlogs, type BlogPost } from "@/api/blogs";

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    listBlogs()
      .then((all) => setPosts(all.slice(0, 3)))
      .catch(() => setPosts([]));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="px-6 py-20 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="text-teal font-semibold uppercase text-sm tracking-wide">From the blog</p>
          <h2 className="font-display text-3xl font-bold text-navy dark:text-mist mt-1">Latest Articles</h2>
        </div>
        <Link to="/blog" className="text-teal font-semibold hover:underline">
          Read All Posts →
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="rounded-2xl glass p-6 hover:-translate-y-1 transition-transform block"
          >
            <span className="inline-block rounded-full bg-teal/10 text-teal text-xs font-semibold px-3 py-1">
              {post.category}
            </span>
            <h3 className="font-display text-lg font-semibold text-navy dark:text-mist mt-3">{post.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
