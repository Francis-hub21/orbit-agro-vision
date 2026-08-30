import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail } from "lucide-react";

const COMPANY_EMAIL = "orbitagro@orbitagro.co.ke";

export function ContactModal({
  open,
  onClose,
  productName,
}: {
  open: boolean;
  onClose: () => void;
  productName?: string;
}) {
  const [email, setEmail] = useState("");
  const [need, setNeed] = useState("");

  useEffect(() => {
    if (open) {
      setNeed(productName ? `I would like to request ${productName}. ` : "");
    }
  }, [open, productName]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = productName ? `Product request — ${productName}` : "Website enquiry";
    const body = [
      productName ? `Product: ${productName}` : null,
      `Customer email: ${email}`,
      "",
      "What the customer needs:",
      need,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg glass-emerald rounded-3xl p-7 md:p-9 space-y-5"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 text-muted-foreground hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2">Contact Us</div>
              <h3 className="font-display text-2xl">
                {productName ? `Request ${productName}` : "Talk to Orbit Agro"}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Tell us what you need and our agronomy team will get back to you.
              </p>
            </div>

            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2 block">
                Your Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2 block">
                What do you need exactly?
              </label>
              <textarea
                required
                rows={4}
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                placeholder="Quantity, crop, county, delivery preference…"
                className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-[0_0_30px_oklch(0.72_0.20_150/0.5)] hover:shadow-[0_0_50px_oklch(0.72_0.20_150/0.8)] transition-all"
            >
              <Send className="h-3.5 w-3.5" /> Send Request
            </button>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5 text-primary" /> Goes to {COMPANY_EMAIL}
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
