import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wired to the real backend endpoint in a later day.
    setSubmitted(true);
  }

  return (
    <section className="px-6 py-16">
      <div className="max-w-3xl mx-auto text-center rounded-3xl bg-navy dark:bg-white/5 px-8 py-12">
        <h2 className="font-display text-2xl font-bold text-white">Get AI & bioinformatics insights in your inbox</h2>
        <p className="mt-2 text-mist/70 text-sm">No spam — just the occasional project breakdown and tutorial.</p>

        {submitted ? (
          <p className="mt-6 text-teal-light font-semibold">Thanks for subscribing! 🎉</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-full px-5 py-3 w-full sm:w-72 text-navy outline-none"
            />
            <button type="submit" className="rounded-full bg-teal px-6 py-3 font-semibold text-white hover:bg-teal-light">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
