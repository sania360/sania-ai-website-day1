import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import OrderForm from "@/components/order/OrderForm";
import { useSEO } from "@/hooks/useSEO";

export default function OrderService() {
  useSEO({ title: "Order a Service", description: "Order an AI, machine learning, or data analytics service from Sania Ismail." });
  const [params] = useSearchParams();
  const prefillService = params.get("service") || undefined;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <p className="text-teal font-semibold uppercase text-sm tracking-wide">Let's work together</p>
        <h1 className="font-display text-4xl font-bold text-navy dark:text-mist mt-1">Order a Service</h1>
        <p className="mt-3 text-navy/70 dark:text-mist/70 max-w-xl mx-auto">
          Fill in the details below and you'll get an order ID immediately, plus a confirmation email. I typically
          reply within 24 hours.
        </p>
      </motion.div>

      <OrderForm prefillService={prefillService} />
    </div>
  );
}
