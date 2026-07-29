import { HiStar } from "react-icons/hi";

export default function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <HiStar key={i} className={i < rating ? "text-teal" : "text-navy/15 dark:text-mist/15"} />
      ))}
    </div>
  );
}
