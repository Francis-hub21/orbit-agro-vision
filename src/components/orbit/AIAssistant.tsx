import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { orbitChat } from "@/lib/orbit-ai.functions";

const presets = [
  "Recommend a fungicide for my tomatoes",
  "Dosage of Glyweed for 5 acres",
  "How do I control aphids on kale?",
];

type Msg = { role: "user" | "assistant"; content: string };

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Habari! I'm Orbit AI — your OACIL agronomy companion. Ask me about pests, dosages, fertilizers or crop protection. How can I help your farm today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chat = useServerFn(orbitChat);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await chat({ data: { messages: next } });
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry — I couldn't reach Orbit AI just now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Orbit AI assistant"
        className="fixed bottom-6 right-6 z-[80] group"
      >
        <div className="absolute inset-0 rounded-full bg-primary/40 blur-2xl animate-pulse-glow" />
        <div className="relative h-14 w-14 rounded-full glass-emerald flex items-center justify-center shadow-[0_0_30px_oklch(0.72_0.20_150/0.6)] group-hover:shadow-[0_0_50px_oklch(0.72_0.20_150/0.9)] transition-all">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping" />
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[80] w-[92vw] max-w-md"
          >
            <div className="glass-emerald rounded-3xl overflow-hidden shadow-[0_30px_60px_-20px_oklch(0_0_0/0.5)]">
              <div className="flex items-center justify-between p-5 border-b border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-primary/40 blur-md" />
                    <div className="relative h-9 w-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-sm">Orbit AI</div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-primary/80">Agronomy Companion · Powered by Gemini</div>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close" className="h-8 w-8 rounded-full hover:bg-white/5 flex items-center justify-center">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-5 space-y-3">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "glass border border-primary/20"
                      }`}
                    >
                      {m.content}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="glass border border-primary/20 rounded-2xl px-4 py-2.5 text-sm flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                    </div>
                  </div>
                )}
              </div>

              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    disabled={loading}
                    className="text-[11px] rounded-full border border-border px-3 py-1 hover:border-primary hover:text-primary transition-all disabled:opacity-50"
                  >
                    {p}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="border-t border-primary/20 p-3 flex items-center gap-2"
              >
                <input name="orbit-ai-question" id="orbit-ai-question"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Orbit AI…"
                  className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:shadow-[0_0_20px_oklch(0.72_0.20_150/0.7)] transition-all disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
