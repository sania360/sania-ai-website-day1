import { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "@/data/siteData";
import { submitMessage } from "@/api/messages";
import { isRequired, isValidEmail } from "@/utils/validators";
import { useSEO } from "@/hooks/useSEO";

const FAISALABAD_MAP_EMBED =
  "https://www.google.com/maps?q=Faisalabad,Pakistan&output=embed";

export default function Contact() {
  useSEO({ title: "Contact", description: "Get in touch with Sania Ismail for AI, machine learning, and bioinformatics project inquiries." });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!isRequired(form.name)) next.name = "Name is required";
    if (!isValidEmail(form.email)) next.email = "Enter a valid email";
    if (!isRequired(form.subject)) next.subject = "Subject is required";
    if (!isRequired(form.message)) next.message = "Message can't be empty";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitMessage(form);
      setSent(true);
    } catch {
      setError("Couldn't send your message right now. Please try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-teal font-semibold uppercase text-sm tracking-wide">Get in touch</p>
        <h1 className="font-display text-4xl font-bold text-navy dark:text-mist mt-1">Contact</h1>
        <p className="mt-3 text-navy/70 dark:text-mist/70">
          Have a project in mind, or just a question? Reach out directly or use the form.
        </p>

        <div className="mt-8 space-y-4">
          <ContactRow icon={<HiPhone />} label={profile.phone} href={`tel:${profile.phone.replace(/\s/g, "")}`} />
          <ContactRow icon={<HiMail />} label={profile.email} href={`mailto:${profile.email}`} />
          <ContactRow icon={<FaGithub />} label="github.com/sania360" href={profile.github} external />
          <ContactRow icon={<FaLinkedin />} label="LinkedIn Profile" href={profile.linkedin} external />
          <ContactRow icon={<HiLocationMarker />} label={profile.location} />
        </div>

        <div className="mt-8 rounded-2xl overflow-hidden glass h-64">
          <iframe
            title="Location map — Faisalabad, Pakistan"
            src={FAISALABAD_MAP_EMBED}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        {sent ? (
          <div className="rounded-3xl glass p-10 text-center">
            <HiCheckCircle className="mx-auto text-5xl text-teal" />
            <h2 className="font-display text-xl font-bold text-navy dark:text-mist mt-4">Message sent!</h2>
            <p className="mt-2 text-navy/70 dark:text-mist/70 text-sm">
              Thanks for reaching out — I'll reply to {form.email} soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl glass p-8 space-y-5">
            <Field label="Your Name" error={errors.name}>
              <input className="input" value={form.name} onChange={(e) => update("name", e.target.value)} />
            </Field>
            <Field label="Email" error={errors.email}>
              <input className="input" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </Field>
            <Field label="Subject" error={errors.subject}>
              <input className="input" value={form.subject} onChange={(e) => update("subject", e.target.value)} />
            </Field>
            <Field label="Message" error={errors.message}>
              <textarea className="input min-h-32" value={form.message} onChange={(e) => update("message", e.target.value)} />
            </Field>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-teal py-3 font-semibold text-white hover:bg-teal-light disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

function ContactRow({ icon, label, href, external }: { icon: React.ReactNode; label: string; href?: string; external?: boolean }) {
  const content = (
    <div className="flex items-center gap-3 text-navy/80 dark:text-mist/80 hover:text-teal transition-colors">
      <span className="text-teal text-lg">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
  if (!href) return content;
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      {content}
    </a>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-navy dark:text-mist">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}
