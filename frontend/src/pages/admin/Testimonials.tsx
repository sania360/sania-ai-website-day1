import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import { listTestimonials, createTestimonial, deleteTestimonial, type Testimonial } from "@/api/adminTestimonials";

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    listTestimonials().then(setItems);
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) return;
    const created = await createTestimonial(author, quote);
    setItems((prev) => [created, ...prev]);
    setAuthor("");
    setQuote("");
  }

  async function handleDelete(id: number) {
    await deleteTestimonial(id);
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy dark:text-mist mb-6">Testimonials</h1>

      <form onSubmit={handleAdd} className="rounded-2xl glass p-6 mb-6 grid sm:grid-cols-2 gap-4">
        <input className="input" placeholder="Author (e.g. Project Supervisor)" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input className="input" placeholder="Quote" value={quote} onChange={(e) => setQuote(e.target.value)} />
        <button className="sm:col-span-2 rounded-full bg-teal py-2.5 text-sm font-semibold text-white hover:bg-teal-light">
          Add Testimonial
        </button>
      </form>

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl glass p-5 flex justify-between gap-3">
            <div>
              <p className="text-sm text-navy/80 dark:text-mist/80">"{t.quote}"</p>
              <p className="text-xs font-semibold text-teal mt-2">— {t.author}</p>
            </div>
            <button onClick={() => handleDelete(t.id)} className="text-navy/40 dark:text-mist/40 hover:text-red-500">
              <HiTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
