import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const FOOTER_LINKS = [
  {
    heading: "Explore",
    links: [
      { label: "About", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Projects", to: "/projects" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "FAQs", to: "/faqs" },
      { label: "Career", to: "/career" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-mist/80 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-bold text-white">
            Sania <span className="text-teal">Ismail</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed max-w-xs">
            Built with a focus on bioinformatics, machine learning, and full-stack AI
            engineering — Faisalabad, Pakistan.
          </p>
          <div className="mt-5 flex gap-4 text-lg">
            <a href="https://github.com/sania360" target="_blank" rel="noreferrer" className="hover:text-teal">
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/sania-ismail-9a79a4346"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal"
            >
              <FaLinkedin />
            </a>
            <a href="https://wa.me/923400611656" target="_blank" rel="noreferrer" className="hover:text-teal">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {FOOTER_LINKS.map((col) => (
          <div key={col.heading}>
            <p className="font-semibold text-white mb-3">{col.heading}</p>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-teal transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-mist/60">
        © {new Date().getFullYear()} Sania Ismail — AI, Machine Learning & Data Analytics Solutions. All rights reserved.
      </div>
    </footer>
  );
}
