import { projectCategories } from "@/data/projectsData";

interface Props {
  active: string;
  onChange: (c: string) => void;
}

export default function ProjectFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {projectCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === cat ? "bg-teal text-white" : "glass text-navy/70 dark:text-mist/70 hover:text-teal"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
