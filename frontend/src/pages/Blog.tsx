import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { listBlogs, parseTags, type BlogPost } from "@/api/blogs";
import { estimateReadingTime } from "@/utils/readingTime";

const CATEGORIES = ["All", "Machine Learning", "AI", "Python", "Bioinformatics", "Data Science"];

export default function Blog() {
  useSEO({
    title: "Blog",
    description: "Articles on machine learning, AI, and bioinformatics from Sania Ismail.",
  });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    listBlogs()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (category === "All" ? posts : posts.filter((p) => p.category === category)),
    [posts, category]
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-teal font-semibold uppercase text-sm tracking-wide">Writing</p>
        <h1 className="font-display text-4xl font-bold text-navy dark:text-mist mt-1">Blog</h1>
      </motion.div>

      <div className="flex flex-wrap gap-2 mt-8 mb-10">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              category === c ? "bg-teal text-white" : "glass text-navy/70 dark:text-mist/70 hover:text-teal"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-navy/60 dark:text-mist/60">Loading posts...</p>
      ) : filtered.length === 0 ? (
        <p className="text-navy/60 dark:text-mist/60">No posts in this category yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="rounded-2xl glass overflow-hidden hover:-translate-y-1 transition-transform block"
            >
              {post.featured_image ? (
                <img src={post.featured_image} alt={post.title} className="h-40 w-full object-cover" />
              ) : (
                <div className="h-40 w-full bg-gradient-to-br from-navy to-teal/60" />
              )}
              <div className="p-6">
                <span className="inline-block rounded-full bg-teal/10 text-teal text-xs font-semibold px-3 py-1">
                  {post.category}
                </span>
                <h2 className="font-display text-lg font-semibold text-navy dark:text-mist mt-3">{post.title}</h2>
                <p className="mt-2 text-sm text-navy/70 dark:text-mist/70">{post.excerpt}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {parseTags(post.tags).map((tag) => (
                    <span key={tag} className="text-xs text-teal/80 bg-teal/5 rounded-full px-2 py-0.5">
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-xs text-navy/40 dark:text-mist/40">
                  {new Date(post.created_at).toLocaleDateString()} · {estimateReadingTime(post.content_markdown)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
