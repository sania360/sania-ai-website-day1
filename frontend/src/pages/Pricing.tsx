import { useState } from "react";
import { motion } from "framer-motion";
import { HiCheck } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { pricingTiers } from "@/data/pricingData";

export default function Pricing() {
  useSEO({
    title: "Pricing",
    description: "Simple, transparent pricing tiers for AI, machine learning, and data analytics services.",
  });
  const [billing, setBilling] = useState<"project" | "monthly">("project");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-teal font-semibold uppercase text-sm tracking-wide">Simple pricing</p>
        <h1 className="font-display text-4xl font-bold text-navy dark:text-mist mt-1">Pricing Plans</h1>
        <p className="mt-3 text-navy/70 dark:text-mist/70 max-w-xl mx-auto">
          Most clients book individual services from the Services page — these tiers are for ongoing or
          larger-scope engagements.
        </p>

        <div className="mt-6 inline-flex rounded-full glass p-1">
          <button
            onClick={() => setBilling("project")}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              billing === "project" ? "bg-teal text-white" : "text-navy/70 dark:text-mist/70"
            }`}
          >
            One-time Project
          </button>
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              billing === "monthly" ? "bg-teal text-white" : "text-navy/70 dark:text-mist/70"
            }`}
          >
            Monthly Retainer
          </button>
        </div>
      </motion.div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingTiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`rounded-3xl p-6 flex flex-col ${
              tier.highlighted ? "bg-navy text-white shadow-xl scale-[1.03]" : "glass"
            }`}
          >
            <h3 className="font-display text-lg font-bold">{tier.name}</h3>
            <p className={`mt-2 text-2xl font-bold ${tier.highlighted ? "text-teal-light" : "text-teal"}`}>
              {billing === "project" ? tier.projectPrice : tier.monthlyPrice}
            </p>
            <p className={`mt-2 text-sm ${tier.highlighted ? "text-mist/70" : "text-navy/70 dark:text-mist/70"}`}>
              {tier.description}
            </p>
            <ul className="mt-4 space-y-2 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm">
                  <HiCheck className={tier.highlighted ? "text-teal-light" : "text-teal"} />
                  <span className={tier.highlighted ? "text-mist/90" : "text-navy/80 dark:text-mist/80"}>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/order-service"
              className={`mt-6 text-center rounded-full py-2.5 text-sm font-semibold transition-colors ${
                tier.highlighted ? "bg-teal text-white hover:bg-teal-light" : "glass text-navy dark:text-mist hover:text-teal"
              }`}
            >
              Get Started
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
