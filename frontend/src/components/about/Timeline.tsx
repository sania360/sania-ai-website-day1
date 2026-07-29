import { motion } from "framer-motion";
import { education, experience } from "@/data/siteData";

export default function Timeline() {
  const items = [
    ...experience.map((e) => ({ ...e, kind: "Experience", title: e.role, org: e.org })),
    ...education.map((e) => ({ ...e, kind: "Education", title: e.degree, org: e.institute })),
  ];

  return (
    <div className="mt-6 space-y-6">
      {items.map((item, i) => (
        <motion.div
          key={`${item.title}-${i}`}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="flex gap-4 border-l-2 border-teal/40 pl-5 relative"
        >
          <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-teal" />
          <div>
            <span className="text-xs font-semibold text-teal uppercase tracking-wide">{item.kind} · {item.period}</span>
            <h3 className="font-display text-lg font-semibold text-navy dark:text-mist mt-1">{item.title}</h3>
            <p className="text-sm text-navy/70 dark:text-mist/70">{item.org}</p>
            <p className="mt-1 text-sm text-navy/60 dark:text-mist/60">{item.detail}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
