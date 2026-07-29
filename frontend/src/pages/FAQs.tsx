import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { HiSearch } from "react-icons/hi";
import { useSEO } from "@/hooks/useSEO";
import { faqs } from "@/data/faqData";
import FaqAccordion from "@/components/faq/FaqAccordion";

export default function FAQs() {
  useSEO({
    title: "FAQs",
    description: "Answers to common questions about working with Sania Ismail on AI, ML, and bioinformatics projects.",
  });
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => faqs.filter((f) => f.question.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-teal font-semibold uppercase text-sm tracking-wide">Questions?</p>
        <h1 className="font-display text-4xl font-bold text-navy dark:text-mist mt-1">Frequently Asked Questions</h1>
      </motion.div>

      <div className="relative max-w-md mx-auto mt-8 mb-8">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 dark:text-mist/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="w-full rounded-full glass pl-11 pr-4 py-2.5 text-sm outline-none text-navy dark:text-mist"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-navy/60 dark:text-mist/60">No questions match "{search}".</p>
      ) : (
        <FaqAccordion items={filtered} />
      )}
    </div>
  );
}
