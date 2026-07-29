import { HiSearch } from "react-icons/hi";
import { categories } from "@/data/servicesData";

interface Props {
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  search: string;
  onSearchChange: (s: string) => void;
}

export default function ServiceFilter({ activeCategory, onCategoryChange, search, onSearchChange }: Props) {
  return (
    <div className="flex flex-col gap-4 mb-10">
      <div className="relative max-w-md">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 dark:text-mist/40" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search services..."
          className="w-full rounded-full glass pl-11 pr-4 py-2.5 text-sm outline-none placeholder:text-navy/40 dark:placeholder:text-mist/40 text-navy dark:text-mist"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-teal text-white"
                : "glass text-navy/70 dark:text-mist/70 hover:text-teal"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
