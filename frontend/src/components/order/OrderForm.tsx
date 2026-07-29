import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi";
import type { OrderFormData } from "@/types/order";
import { isRequired, isValidEmail, isValidPhone } from "@/utils/validators";
import { submitOrder } from "@/api/orders";
import { services } from "@/data/servicesData";
import FileUpload from "@/components/order/FileUpload";

const STEPS = ["Your Details", "Project Info", "Review & Submit"];

const initialState: OrderFormData = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  service: "",
  budget: "",
  deadline: "",
  description: "",
  notes: "",
  file: null,
};

export default function OrderForm({ prefillService }: { prefillService?: string }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<OrderFormData>({
    ...initialState,
    service: prefillService || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  function update<K extends keyof OrderFormData>(key: K, value: OrderFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validateStep(current: number): boolean {
    const next: Record<string, string> = {};
    if (current === 0) {
      if (!isRequired(form.fullName)) next.fullName = "Full name is required";
      if (!isValidEmail(form.email)) next.email = "Enter a valid email";
      if (!isValidPhone(form.phone)) next.phone = "Enter a valid phone number";
      if (!isRequired(form.country)) next.country = "Country is required";
    }
    if (current === 1) {
      if (!isRequired(form.service)) next.service = "Select a service";
      if (!isRequired(form.budget)) next.budget = "Budget is required";
      if (!isRequired(form.deadline)) next.deadline = "Deadline is required";
      if (!isRequired(form.description)) next.description = "Please describe the project";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function nextStep() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await submitOrder(form);
      setOrderId(res.order_id);
    } catch (err) {
      setSubmitError("Something went wrong submitting your order. Please try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (orderId) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl glass p-10 text-center max-w-lg mx-auto"
      >
        <HiCheckCircle className="mx-auto text-6xl text-teal" />
        <h2 className="font-display text-2xl font-bold text-navy dark:text-mist mt-4">
          Thanks, {form.fullName.split(" ")[0]} — your order is in!
        </h2>
        <p className="mt-2 text-navy/70 dark:text-mist/70">
          Order <strong>{orderId}</strong> is now <strong>Pending</strong>. Expect a reply within 24 hours at{" "}
          {form.email}.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full grid place-items-center text-xs font-bold transition-colors ${
                i <= step ? "bg-teal text-white" : "bg-navy/10 dark:bg-white/10 text-navy/50 dark:text-mist/50"
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-xs hidden sm:inline ${i === step ? "text-teal font-semibold" : "text-navy/50 dark:text-mist/50"}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <div className="w-6 sm:w-10 h-px bg-navy/15 dark:bg-white/15" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl glass p-8 space-y-5"
        >
          {step === 0 && (
            <>
              <Field label="Full Name" error={errors.fullName}>
                <input className="input" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
              </Field>
              <Field label="Company (optional)">
                <input className="input" value={form.company} onChange={(e) => update("company", e.target.value)} />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email" error={errors.email}>
                  <input className="input" value={form.email} onChange={(e) => update("email", e.target.value)} />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input className="input" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </Field>
              </div>
              <Field label="Country" error={errors.country}>
                <input className="input" value={form.country} onChange={(e) => update("country", e.target.value)} />
              </Field>
            </>
          )}

          {step === 1 && (
            <>
              <Field label="Service" error={errors.service}>
                <select className="input" value={form.service} onChange={(e) => update("service", e.target.value)}>
                  <option value="">Select a service...</option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title} ({s.price})
                    </option>
                  ))}
                </select>
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Budget" error={errors.budget}>
                  <input className="input" placeholder="e.g. $150" value={form.budget} onChange={(e) => update("budget", e.target.value)} />
                </Field>
                <Field label="Deadline" error={errors.deadline}>
                  <input className="input" placeholder="e.g. 2 weeks" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} />
                </Field>
              </div>
              <Field label="Project Description" error={errors.description}>
                <textarea className="input min-h-28" value={form.description} onChange={(e) => update("description", e.target.value)} />
              </Field>
              <Field label="Additional Notes (optional)">
                <textarea className="input min-h-20" value={form.notes} onChange={(e) => update("notes", e.target.value)} />
              </Field>
              <Field label="Upload File (optional)">
                <FileUpload file={form.file} onChange={(f) => update("file", f)} />
              </Field>
            </>
          )}

          {step === 2 && (
            <div className="space-y-3 text-sm">
              <h3 className="font-display text-lg font-semibold text-navy dark:text-mist mb-2">Review your order</h3>
              {[
                ["Name", form.fullName],
                ["Company", form.company || "—"],
                ["Email", form.email],
                ["Phone", form.phone],
                ["Country", form.country],
                ["Service", form.service],
                ["Budget", form.budget],
                ["Deadline", form.deadline],
                ["Description", form.description],
                ["Notes", form.notes || "—"],
                ["File", form.file?.name || "None"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-navy/10 dark:border-white/10 pb-2">
                  <span className="text-navy/60 dark:text-mist/60">{label}</span>
                  <span className="text-navy dark:text-mist font-medium text-right max-w-xs">{value}</span>
                </div>
              ))}
              {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 0 ? (
              <button onClick={prevStep} className="rounded-full px-5 py-2.5 text-sm font-semibold text-navy dark:text-mist glass">
                Back
              </button>
            ) : (
              <span />
            )}
            {step < STEPS.length - 1 ? (
              <button
                onClick={nextStep}
                className="rounded-full bg-teal px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-light"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="rounded-full bg-teal px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-light disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Order"}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
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
