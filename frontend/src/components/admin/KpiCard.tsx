export default function KpiCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl glass p-6">
      <p className="text-sm text-navy/60 dark:text-mist/60">{label}</p>
      <p className="font-display text-3xl font-bold text-teal mt-1">{value}</p>
    </div>
  );
}
