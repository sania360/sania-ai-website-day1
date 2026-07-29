import { motion } from "framer-motion";

// Placeholder quotes until real client testimonials are collected (Admin > Testimonials, Day 5).
const PLACEHOLDER_TESTIMONIALS = [
  {
    quote: "Clear communication and a genuinely solid grasp of the ML fundamentals — exactly what our project needed.",
    author: "Project Supervisor",
  },
  {
    quote: "Delivered a working pipeline ahead of schedule and explained every step along the way.",
    author: "Coursework Collaborator",
  },
  {
    quote: "Turned a messy dataset into a clean, usable dashboard without any back-and-forth.",
    author: "Internship Mentor",
  },
];

export default function TestimonialsPreview() {
  return (
    <section className="px-6 py-20 bg-white/50 dark:bg-white/5">
      <div className="max-w-6xl mx-auto">
        <p className="text-teal font-semibold uppercase text-sm tracking-wide text-center">Kind words</p>
        <h2 className="font-display text-3xl font-bold text-navy dark:text-mist mt-1 text-center">Testimonials</h2>

        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {PLACEHOLDER_TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl glass p-6 text-sm text-navy/80 dark:text-mist/80"
            >
              “{t.quote}”
              <footer className="mt-4 font-semibold text-navy dark:text-mist not-italic">— {t.author}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
