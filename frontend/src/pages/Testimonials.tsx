import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { listPublicTestimonials, type PublicTestimonial } from "@/api/testimonialsPublic";
import RatingStars from "@/components/testimonials/RatingStars";

export default function Testimonials() {
  useSEO({
    title: "Testimonials",
    description: "What clients and collaborators say about working with Sania Ismail.",
  });
  const [items, setItems] = useState<PublicTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listPublicTestimonials()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-teal font-semibold uppercase text-sm tracking-wide">Kind words</p>
        <h1 className="font-display text-4xl font-bold text-navy dark:text-mist mt-1">Testimonials</h1>
      </motion.div>

      {loading ? (
        <p className="text-center text-navy/60 dark:text-mist/60 mt-10">Loading testimonials...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-navy/60 dark:text-mist/60 mt-10">
          Testimonials will appear here as client feedback comes in.
        </p>
      ) : (
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl glass p-6 text-sm text-navy/80 dark:text-mist/80"
            >
              <RatingStars rating={t.rating} />
              <p className="mt-3">"{t.quote}"</p>
              <footer className="mt-4 font-semibold text-navy dark:text-mist not-italic">— {t.author}</footer>
            </motion.blockquote>
          ))}
        </div>
      )}
    </div>
  );
}
