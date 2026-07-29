import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import { listAdminProjects, createAdminProject, deleteAdminProject, type AdminProject } from "@/api/adminProjects";

const empty = { slug: "", title: "", category: "", summary: "", github: "", live_demo: "" };

export default function Projects() {
  const [items, setItems] = useState<AdminProject[]>([]);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listAdminProjects().then(setItems);
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const created = await createAdminProject(form);
      setItems((prev) => [created, ...prev]);
      setForm(empty);
    } catch {
      setError("Couldn't add project — slug might already exist.");
    }
  }

  async function handleDelete(id: number) {
    await deleteAdminProject(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy dark:text-mist mb-2">Manage Projects</h1>
      <p className="text-sm text-navy/60 dark:text-mist/60 mb-6">
        Entries added here are stored in the database for future use. The public Projects page currently reads
        from <code>src/data/projectsData.ts</code> — wiring the public page to this API is a follow-up task.
      </p>

      <form onSubmit={handleAdd} className="rounded-2xl glass p-6 mb-6 grid sm:grid-cols-2 gap-4">
        <input className="input" placeholder="Slug (unique, e.g. my-project)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input className="input" placeholder="GitHub URL (optional)" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
        <textarea className="input sm:col-span-2" placeholder="Summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
        {error && <p className="text-red-500 text-sm sm:col-span-2">{error}</p>}
        <button className="sm:col-span-2 rounded-full bg-teal py-2.5 text-sm font-semibold text-white hover:bg-teal-light">
          Add Project
        </button>
      </form>

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((p) => (
          <div key={p.id} className="rounded-2xl glass p-5 flex justify-between gap-3">
            <div>
              <p className="font-semibold text-navy dark:text-mist">{p.title}</p>
              <p className="text-xs text-teal">{p.category}</p>
              <p className="text-sm text-navy/70 dark:text-mist/70 mt-1">{p.summary}</p>
            </div>
            <button onClick={() => handleDelete(p.id)} className="text-navy/40 dark:text-mist/40 hover:text-red-500 shrink-0">
              <HiTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
