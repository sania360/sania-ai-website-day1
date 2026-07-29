import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { featuredServices } from "@/data/siteData";

export default function FeaturedServices() {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="text-teal font-semibold uppercase text-sm tracking-wide">What I offer</p>
          <h2 className="font-display text-3xl font-bold text-navy dark:text-mist mt-1">Featured Services</h2>
        </div>
        <Link to="/services" className="text-teal font-semibold hover:underline">
          View All Services →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredServices.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl glass p-6 shadow-sm"
          >
            <p className="text-teal font-bold text-sm">{s.price}</p>
            <h3 className="font-display text-lg font-semibold text-navy dark:text-mist mt-1">{s.title}</h3>
            <p className="mt-2 text-sm text-navy/70 dark:text-mist/70">{s.blurb}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
