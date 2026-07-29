import { technologies } from "@/data/siteData";

export default function TechMarquee() {
  const looped = [...technologies, ...technologies];
  return (
    <section className="py-14 border-y border-navy/5 dark:border-white/5 overflow-hidden">
      <p className="text-center text-teal font-semibold uppercase text-sm tracking-wide mb-6">
        Technologies I work with
      </p>
      <div className="flex gap-10 whitespace-nowrap animate-[scroll_30s_linear_infinite] w-max">
        {looped.map((tech, i) => (
          <span key={`${tech}-${i}`} className="text-navy/60 dark:text-mist/60 font-display text-lg font-semibold">
            {tech}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
