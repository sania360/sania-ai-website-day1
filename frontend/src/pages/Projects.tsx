import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projectsData";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilter from "@/components/projects/ProjectFilter";
import { useSEO } from "@/hooks/useSEO";

export default function Projects() {
  useSEO({ title: "Projects", description: "A portfolio of machine learning, bioinformatics, and full-stack AI projects by Sania Ismail." });
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return category === "All" ? projects : projects.filter((p) => p.category === category);
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-teal font-semibold uppercase text-sm tracking-wide">Portfolio</p>
        <h1 className="font-display text-4xl font-bold text-navy dark:text-mist mt-1">Projects</h1>
        <p className="mt-3 text-navy/70 dark:text-mist/70 max-w-2xl">
          A selection of machine learning, bioinformatics, and full-stack AI projects — each with the real problem,
          approach, and results behind it.
        </p>
      </motion.div>

      <div className="mt-10">
        <ProjectFilter active={category} onChange={setCategory} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}
