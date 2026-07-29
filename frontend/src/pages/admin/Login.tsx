import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(username, password);
      navigate("/admin");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-navy px-6">
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl glass p-8"
      >
        <p className="font-display text-xl font-bold text-white text-center">
          Sania <span className="text-teal">Admin</span>
        </p>
        <p className="text-mist/60 text-sm text-center mt-1 mb-6">Sign in to manage the site</p>

        <label className="block mb-4">
          <span className="text-sm text-mist/80">Username</span>
          <input className="input mt-1" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
        </label>
        <label className="block mb-6">
          <span className="text-sm text-mist/80">Password</span>
          <input
            type="password"
            className="input mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-teal py-3 font-semibold text-white hover:bg-teal-light disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </motion.form>
    </div>
  );
}
