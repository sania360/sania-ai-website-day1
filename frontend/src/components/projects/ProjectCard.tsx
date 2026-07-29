import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Project } from "@/data/projectsData";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 9) * 0.05 }}
      whileHover={{ y: -6 }}
      className="rounded-2xl glass p-6 flex flex-col justify-between shadow-sm"
    >
      <div>
        <span className="inline-block rounded-full bg-teal/10 text-teal text-xs font-semibold px-3 py-1">
          {project.category}
        </span>
        <h3 className="font-display text-lg font-semibold text-navy dark:text-mist mt-3">{project.title}</h3>
        <p className="mt-2 text-sm text-navy/70 dark:text-mist/70 line-clamp-3">{project.problem}</p>
      </div>
      <Link
        to={`/projects/${project.slug}`}
        className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
      >
        Read case study →
      </Link>
    </motion.div>
  );
}
