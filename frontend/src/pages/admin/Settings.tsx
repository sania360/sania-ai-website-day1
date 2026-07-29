import { useState } from "react";
import { changePassword } from "@/api/auth";

export default function Settings() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await changePassword(current, next);
      setStatus("success");
      setCurrent("");
      setNext("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy dark:text-mist mb-6">Settings</h1>
      <form onSubmit={handleSubmit} className="rounded-2xl glass p-6 max-w-md space-y-4">
        <h2 className="font-semibold text-navy dark:text-mist">Change Password</h2>
        <label className="block">
          <span className="text-sm text-navy dark:text-mist">Current Password</span>
          <input type="password" className="input mt-1" value={current} onChange={(e) => setCurrent(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm text-navy dark:text-mist">New Password</span>
          <input type="password" className="input mt-1" value={next} onChange={(e) => setNext(e.target.value)} />
        </label>
        {status === "success" && <p className="text-teal text-sm">Password updated successfully.</p>}
        {status === "error" && <p className="text-red-500 text-sm">Current password is incorrect.</p>}
        <button className="rounded-full bg-teal px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-light">
          Update Password
        </button>
      </form>
    </div>
  );
}
