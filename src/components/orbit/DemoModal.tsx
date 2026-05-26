import { motion, AnimatePresence } from "framer-motion";
import { X, Sprout, Beaker, Truck, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  { icon: Sprout, title: "Identify the Crop", text: "Tell Orbit what you're growing. Our intelligence engine maps regional risks and growth stages instantly." },
  { icon: Beaker, title: "Get Precise Solutions", text: "Receive scientifically validated products, dosages and application windows tailored to your acreage." },
  { icon: Truck, title: "Distribution at Speed", text: "Order through the nearest agrovet or distributor with real-time inventory and logistics tracking." },
  { icon: BarChart3, title: "Monitor & Optimize", text: "Live weather, drone scans and AI agronomy guidance continuously improve your yield." },
];

export function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setI((v) => (v + 1) % steps.length), 4200);
    return () => clearInterval(id);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background/85 backdrop-blur-xl p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full glass-emerald rounded-3xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 h-9 w-9 rounded-full glass flex items-center justify-center hover:border-primary/60"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-square md:aspect-auto bg-gradient-to-br from-primary/20 via-transparent to-primary/5 p-12 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.72_0.20_150/0.25),transparent_60%)]" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i}
                    initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <div className="absolute inset-0 -m-8 rounded-full bg-primary/30 blur-3xl" />
                    <div className="relative h-32 w-32 rounded-full border border-primary/40 flex items-center justify-center bg-background/40">
                      {(() => {
                        const Icon = steps[i].icon;
                        return <Icon className="h-12 w-12 text-primary" />;
                      })()}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="p-10 md:p-12 flex flex-col">
                <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">
                  Interactive Demo · Step {i + 1} of {steps.length}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="font-display text-3xl md:text-4xl font-light mb-4">
                      {steps[i].title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{steps[i].text}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-auto pt-8 flex items-center gap-2">
                  {steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setI(idx)}
                      className={`h-1 rounded-full transition-all ${
                        idx === i ? "w-10 bg-primary" : "w-5 bg-border hover:bg-primary/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
