import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Service } from "@/data/servicesData";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
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
          {service.category}
        </span>
        <h3 className="font-display text-lg font-semibold text-navy dark:text-mist mt-3">{service.title}</h3>
        <p className="mt-2 text-sm text-navy/70 dark:text-mist/70">{service.description}</p>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="font-bold text-teal">{service.price}</span>
        <Link
          to={`/order-service?service=${encodeURIComponent(service.title)}`}
          className="rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal-light transition-colors"
        >
          Order Now
        </Link>
      </div>
    </motion.div>
  );
}
