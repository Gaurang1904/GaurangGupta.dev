// AuraChat.tsx
import { useEffect, useRef, useState } from "react";

// Set VITE_ASSISTANT_API_URL in your portfolio's .env; falls back to local dev.
const API_URL = import.meta.env.VITE_ASSISTANT_API_URL ?? "http://localhost:8000";

type Source = {
  document: string;
  excerpt: string;
  page_number: number | null;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

export function AuraChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionId = useRef<string | null>(null); // remembers the conversation thread
  const listRef = useRef<HTMLDivElement>(null);

  // keep the newest message in view (scoped to the list, never the page)
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const question = input.trim();
    if (!question || loading) return;
    setInput("");
    setError(null);
    setMessages((m) => [...m, { role: "user", content: question }]);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, session_id: sessionId.current }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail ?? `Request failed (${res.status})`);
      }
      const data = await res.json();
      sessionId.current = data.session_id; // reuse on every follow-up
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.answer, sources: data.sources },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="aura-chat">
      <div className="aura-messages" ref={listRef} data-lenis-prevent>
        {messages.length === 0 && !loading && !error && (
          <div className="aura-empty">
            Hi, I'm Aura — Gaurang's assistant. Ask about his projects, skills, or experience.
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`aura-msg aura-msg--${m.role}`}>
            <p>{m.content}</p>
            {m.sources && m.sources.length > 0 && (
              <p className="aura-sources">
                Sources: {[...new Set(m.sources.map((s) => s.document))].join(", ")}
              </p>
            )}
          </div>
        ))}
        {loading && <div className="aura-msg aura-msg--assistant">Thinking…</div>}
        {error && <p className="aura-error">{error}</p>}
      </div>

      <form
        className="aura-input"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my projects, skills, or experience…"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>Send</button>
      </form>
    </div>
  );
}