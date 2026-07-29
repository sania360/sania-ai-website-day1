import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import { listAdminServices, createAdminService, deleteAdminService, type AdminService } from "@/api/adminServices";

const empty = { title: "", category: "", price: "", description: "" };

export default function Services() {
  const [items, setItems] = useState<AdminService[]>([]);
  const [form, setForm] = useState(empty);

  useEffect(() => {
    listAdminServices().then(setItems);
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const created = await createAdminService(form);
    setItems((prev) => [created, ...prev]);
    setForm(empty);
  }

  async function handleDelete(id: number) {
    await deleteAdminService(id);
    setItems((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy dark:text-mist mb-2">Manage Services</h1>
      <p className="text-sm text-navy/60 dark:text-mist/60 mb-6">
        Entries added here are stored in the database. The public Services page currently reads from{" "}
        <code>src/data/servicesData.ts</code> — wiring the public page to this API is a follow-up task.
      </p>

      <form onSubmit={handleAdd} className="rounded-2xl glass p-6 mb-6 grid sm:grid-cols-2 gap-4">
        <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input className="input" placeholder="Price (e.g. $100)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input className="input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="sm:col-span-2 rounded-full bg-teal py-2.5 text-sm font-semibold text-white hover:bg-teal-light">
          Add Service
        </button>
      </form>

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((s) => (
          <div key={s.id} className="rounded-2xl glass p-5 flex justify-between gap-3">
            <div>
              <p className="font-semibold text-navy dark:text-mist">{s.title}</p>
              <p className="text-xs text-teal">{s.category} · {s.price}</p>
              <p className="text-sm text-navy/70 dark:text-mist/70 mt-1">{s.description}</p>
            </div>
            <button onClick={() => handleDelete(s.id)} className="text-navy/40 dark:text-mist/40 hover:text-red-500 shrink-0">
              <HiTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
