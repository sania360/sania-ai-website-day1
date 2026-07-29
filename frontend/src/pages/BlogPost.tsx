import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useSEO } from "@/hooks/useSEO";
import { getBlogBySlug, parseTags, type BlogPost as BlogPostType } from "@/api/blogs";
import { estimateReadingTime } from "@/utils/readingTime";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getBlogBySlug(slug)
      .then(setPost)
      .catch(() => setNotFound(true));
  }, [slug]);

  useSEO({
    title: post?.title || "Blog Post",
    description: post?.excerpt || "An article from Sania Ismail's blog.",
    image: post?.featured_image || undefined,
  });

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-navy dark:text-mist">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-teal font-semibold hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  if (!post) {
    return <p className="text-center py-24 text-navy/60 dark:text-mist/60">Loading post...</p>;
  }

  const htmlContent = DOMPurify.sanitize(marked.parse(post.content_markdown, { async: false }) as string);
  const tags = parseTags(post.tags);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link to="/blog" className="inline-flex items-center gap-2 text-teal font-semibold hover:underline">
        <HiArrowLeft /> Back to Blog
      </Link>

      <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
        {post.featured_image && (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-2xl mb-6"
          />
        )}

        <span className="inline-block rounded-full bg-teal/10 text-teal text-xs font-semibold px-3 py-1">
          {post.category}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy dark:text-mist mt-3">{post.title}</h1>
        <p className="mt-2 text-sm text-navy/50 dark:text-mist/50">
          {new Date(post.created_at).toLocaleDateString()} · {estimateReadingTime(post.content_markdown)}
        </p>

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="text-xs text-teal/80 bg-teal/5 rounded-full px-2.5 py-1">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="markdown-content mt-8"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </motion.article>
    </div>
  );
}
