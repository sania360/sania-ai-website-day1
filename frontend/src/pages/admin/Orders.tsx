import { useEffect, useState } from "react";
import { HiDownload } from "react-icons/hi";
import { listOrders, updateOrderStatus, exportOrdersCsv, type AdminOrder } from "@/api/adminOrders";

const STATUSES = ["Pending", "Accepted", "In Progress", "Completed", "Cancelled"];

export default function Orders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    listOrders()
      .then(setOrders)
      .catch(() => setError("Couldn't load orders."))
      .finally(() => setLoading(false));
  }

  async function handleStatusChange(orderId: string, status: string) {
    const updated = await updateOrderStatus(orderId, status);
    setOrders((prev) => prev.map((o) => (o.order_id === orderId ? updated : o)));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-navy dark:text-mist">Orders</h1>
        <button
          onClick={() => exportOrdersCsv()}
          className="inline-flex items-center gap-2 rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal-light"
        >
          <HiDownload /> Export CSV
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-navy/60 dark:text-mist/60">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-navy/60 dark:text-mist/60">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl glass">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-navy/10 dark:border-white/10">
                <th className="p-4">Order ID</th>
                <th className="p-4">Client</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.order_id} className="border-b border-navy/5 dark:border-white/5">
                  <td className="p-4 font-mono text-xs">{o.order_id}</td>
                  <td className="p-4">
                    <p className="font-medium text-navy dark:text-mist">{o.full_name}</p>
                    <p className="text-xs text-navy/50 dark:text-mist/50">{o.email}</p>
                  </td>
                  <td className="p-4">{o.service}</td>
                  <td className="p-4">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.order_id, e.target.value)}
                      className="rounded-full glass px-3 py-1.5 text-xs font-semibold text-navy dark:text-mist"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
