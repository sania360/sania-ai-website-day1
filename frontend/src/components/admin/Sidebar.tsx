import { NavLink } from "react-router-dom";
import {
  HiViewGrid, HiShoppingBag, HiCollection, HiCurrencyDollar,
  HiChatAlt2, HiStar, HiCog,
} from "react-icons/hi";

const LINKS = [
  { to: "/admin", label: "Dashboard", icon: <HiViewGrid />, end: true },
  { to: "/admin/orders", label: "Orders", icon: <HiShoppingBag /> },
  { to: "/admin/projects", label: "Projects", icon: <HiCollection /> },
  { to: "/admin/services", label: "Services", icon: <HiCurrencyDollar /> },
  { to: "/admin/messages", label: "Messages", icon: <HiChatAlt2 /> },
  { to: "/admin/testimonials", label: "Testimonials", icon: <HiStar /> },
  { to: "/admin/settings", label: "Settings", icon: <HiCog /> },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 bg-navy text-mist/80 p-6">
      <p className="font-display text-lg font-bold text-white mb-8">
        Sania <span className="text-teal">Admin</span>
      </p>
      <nav className="flex flex-col gap-1">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive ? "bg-teal text-white" : "hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
