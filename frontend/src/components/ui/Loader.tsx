import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-mist dark:bg-navy-dark">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="h-10 w-10 rounded-full border-4 border-teal/30 border-t-teal"
        />
        <p className="font-display text-navy dark:text-mist text-sm tracking-wide">
          Sania Ismail — loading experience...
        </p>
      </motion.div>
    </div>
  );
}
