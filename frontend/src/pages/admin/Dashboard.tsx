import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend,
} from "chart.js";
import KpiCard from "@/components/admin/KpiCard";
import { fetchDashboardSummary, type DashboardSummary } from "@/api/adminDashboard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardSummary()
      .then(setSummary)
      .catch(() => setError("Couldn't load dashboard data."));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!summary) return <p className="text-navy/60 dark:text-mist/60">Loading dashboard...</p>;

  const statusLabels = Object.keys(summary.orders_by_status);
  const statusValues = Object.values(summary.orders_by_status);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy dark:text-mist mb-6">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Total Orders" value={summary.total_orders} />
        <KpiCard label="Pending" value={summary.orders_by_status.Pending ?? 0} />
        <KpiCard label="In Progress" value={summary.orders_by_status["In Progress"] ?? 0} />
        <KpiCard label="Unread Messages" value={summary.unread_messages} />
      </div>

      <div className="rounded-2xl glass p-6">
        <h2 className="font-display text-lg font-semibold text-navy dark:text-mist mb-4">Orders by Status</h2>
        <Bar
          data={{
            labels: statusLabels,
            datasets: [{ label: "Orders", data: statusValues, backgroundColor: "#13a89e", borderRadius: 6 }],
          }}
          options={{ responsive: true, plugins: { legend: { display: false } } }}
        />
      </div>
    </div>
  );
}
