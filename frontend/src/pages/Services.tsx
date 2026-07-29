import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { services } from "@/data/servicesData";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceFilter from "@/components/services/ServiceFilter";
import { useSEO } from "@/hooks/useSEO";

export default function Services() {
  useSEO({ title: "Services", description: "Data, machine learning, bioinformatics, and web development services from Sania Ismail." });
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchesCategory = category === "All" || s.category === category;
      const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-teal font-semibold uppercase text-sm tracking-wide">Pricing & Services</p>
        <h1 className="font-display text-4xl font-bold text-navy dark:text-mist mt-1">Services</h1>
        <p className="mt-3 text-navy/70 dark:text-mist/70 max-w-2xl">
          From quick data cleanups to full AI systems — pick a service below, or request a custom quote if your
          project doesn't fit neatly into one category.
        </p>
      </motion.div>

      <div className="mt-10">
        <ServiceFilter
          activeCategory={category}
          onCategoryChange={setCategory}
          search={search}
          onSearchChange={setSearch}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-navy/60 dark:text-mist/60 py-16">
          No services match "{search}". Try a different search or category.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
