import { HiLogout } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";

export default function Topbar() {
  const { username, logout } = useAuth();
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-navy/10 dark:border-white/10 glass">
      <p className="text-sm text-navy/60 dark:text-mist/60">Signed in as <strong>{username}</strong></p>
      <button
        onClick={logout}
        className="inline-flex items-center gap-2 text-sm font-semibold text-navy dark:text-mist hover:text-red-500"
      >
        <HiLogout /> Logout
      </button>
    </header>
  );
}
