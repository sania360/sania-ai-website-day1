import { certifications } from "@/data/siteData";
import { HiBadgeCheck } from "react-icons/hi";

export default function Certificates() {
  return (
    <div className="mt-6 grid sm:grid-cols-2 gap-4">
      {certifications.map((c) => (
        <div key={c.title} className="rounded-2xl glass p-5 flex gap-3">
          <HiBadgeCheck className="text-teal text-2xl shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-navy dark:text-mist text-sm">{c.title}</h3>
            <p className="text-xs text-navy/60 dark:text-mist/60 mt-1">{c.issuer} · {c.year}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
