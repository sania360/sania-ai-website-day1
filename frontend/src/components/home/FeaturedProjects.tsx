import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { featuredProjects } from "@/data/siteData";

export default function FeaturedProjects() {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="text-teal font-semibold uppercase text-sm tracking-wide">Recent work</p>
          <h2 className="font-display text-3xl font-bold text-navy dark:text-mist mt-1">Featured Projects</h2>
        </div>
        <Link to="/projects" className="text-teal font-semibold hover:underline">
          View Portfolio →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((proj, i) => (
          <motion.div
            key={proj.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ rotateX: 2, rotateY: -2, y: -6 }}
            className="rounded-2xl glass p-6 shadow-sm [transform-style:preserve-3d]"
          >
            <span className="inline-block rounded-full bg-teal/10 text-teal text-xs font-semibold px-3 py-1">
              {proj.category}
            </span>
            <h3 className="font-display text-lg font-semibold text-navy dark:text-mist mt-3">{proj.title}</h3>
            <p className="mt-2 text-sm text-navy/70 dark:text-mist/70">{proj.summary}</p>
            <Link to={`/projects/${proj.slug}`} className="mt-4 inline-block text-sm font-semibold text-teal hover:underline">
              Read case study →
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
