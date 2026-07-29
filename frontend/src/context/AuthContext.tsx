import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { login as apiLogin, fetchMe } from "@/api/auth";

interface AuthContextValue {
  isAuthenticated: boolean;
  username: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe()
      .then((me) => setUsername(me.username))
      .catch(() => localStorage.removeItem("admin_token"))
      .finally(() => setLoading(false));
  }, []);

  async function login(user: string, password: string) {
    const { access_token } = await apiLogin(user, password);
    localStorage.setItem("admin_token", access_token);
    setUsername(user);
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setUsername(null);
    window.location.href = "/admin/login";
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!username, username, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
