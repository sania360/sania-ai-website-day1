/** Estimates reading time from Markdown content, at ~200 words per minute. */
export function estimateReadingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
