import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { profile } from "@/data/siteData";

function useTypingEffect(words: string[], speed = 90, pause = 1400) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2);
    } else {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypingEffect(profile.roles);

  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-24">
      {/* Floating gradient / particle backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-navy/20 dark:bg-teal-light/10 blur-3xl" />
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-teal/50"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-teal font-semibold tracking-wide uppercase text-sm mb-3">
            {profile.tagline}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-navy dark:text-mist leading-tight">
            Hi, I'm {profile.name}
          </h1>
          <p className="mt-4 h-8 text-xl sm:text-2xl font-semibold text-teal">
            {typed}
            <span className="animate-pulse">|</span>
          </p>
          <p className="mt-5 text-navy/70 dark:text-mist/70 max-w-lg leading-relaxed">
            {profile.heroSummary}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="rounded-full bg-teal px-6 py-3 font-semibold text-white hover:bg-teal-light transition-transform hover:-translate-y-0.5"
            >
              Hire Me
            </Link>
            <Link
              to="/order-service"
              className="rounded-full glass px-6 py-3 font-semibold text-navy dark:text-mist hover:-translate-y-0.5 transition-transform"
            >
              Request a Quote
            </Link>
            <Link
              to="/projects"
              className="rounded-full px-6 py-3 font-semibold text-navy dark:text-mist underline decoration-teal decoration-2 underline-offset-4 hover:text-teal"
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto"
        >
          <div className="relative h-72 w-72 sm:h-80 sm:w-80 rounded-3xl glass grid place-items-center overflow-hidden">
            <span className="font-display text-7xl font-bold text-teal/60">SI</span>
          </div>
          <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 text-sm">
            <p className="font-semibold text-navy dark:text-mist">Based in</p>
            <p className="text-teal">{profile.location}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
