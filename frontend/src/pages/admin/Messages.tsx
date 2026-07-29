import { useEffect, useState } from "react";
import { listMessages, markMessageRead, type AdminMessage } from "@/api/adminMessages";

export default function Messages() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listMessages().then(setMessages).finally(() => setLoading(false));
  }, []);

  async function handleRead(id: number) {
    const updated = await markMessageRead(id);
    setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy dark:text-mist mb-6">Messages</h1>
      {loading ? (
        <p className="text-navy/60 dark:text-mist/60">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-navy/60 dark:text-mist/60">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`rounded-2xl glass p-5 ${!m.is_read ? "border-l-4 border-teal" : ""}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-navy dark:text-mist">
                    {m.subject} {!m.is_read && <span className="text-teal text-xs ml-2">NEW</span>}
                  </p>
                  <p className="text-xs text-navy/50 dark:text-mist/50">{m.name} · {m.email}</p>
                </div>
                {!m.is_read && (
                  <button onClick={() => handleRead(m.id)} className="text-xs font-semibold text-teal hover:underline">
                    Mark as read
                  </button>
                )}
              </div>
              <p className="mt-3 text-sm text-navy/70 dark:text-mist/70">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
