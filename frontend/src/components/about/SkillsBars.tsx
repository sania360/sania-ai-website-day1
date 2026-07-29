import { motion } from "framer-motion";
import { skills } from "@/data/siteData";

export default function SkillsBars() {
  return (
    <div className="mt-6 space-y-5">
      {skills.map((s, i) => (
        <div key={s.name}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-navy dark:text-mist">{s.name}</span>
            <span className="text-teal font-semibold">{s.level}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-navy/10 dark:bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${s.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: "easeOut" }}
              className="h-full rounded-full bg-teal"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
