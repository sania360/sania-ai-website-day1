import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiSun, HiMoon, HiSearch } from "react-icons/hi";
import { useTheme } from "@/context/ThemeContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Pricing", to: "/pricing" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Blog", to: "/blog" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-navy/5" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl font-bold text-navy dark:text-mist">
          Sania <span className="text-teal">Ismail</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `transition-colors hover:text-teal ${
                    isActive ? "text-teal" : "text-navy dark:text-mist/90"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            aria-label="Search"
            className="hidden sm:flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-navy/70 dark:text-mist/70 hover:text-teal transition-colors"
          >
            <HiSearch className="text-base" />
            <span>Search</span>
            <kbd className="ml-1 rounded bg-navy/10 dark:bg-white/10 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </button>

          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="relative grid place-items-center h-9 w-9 rounded-full glass overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-navy dark:text-teal-light text-lg"
              >
                {theme === "dark" ? <HiMoon /> : <HiSun />}
              </motion.span>
            </AnimatePresence>
          </button>

          <Link
            to="/order-service"
            className="hidden sm:inline-flex rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal-light transition-colors"
          >
            Order Now
          </Link>

          <button
            aria-label="Open menu"
            className="lg:hidden text-2xl text-navy dark:text-mist"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden glass overflow-hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-navy dark:text-mist font-medium hover:text-teal"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link
                  to="/order-service"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 inline-block rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white"
                >
                  Order Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
